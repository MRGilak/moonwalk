// Netlify Function: netlify/functions/summarize.js
// CommonJS export for broad Netlify compatibility; uses native fetch (Node 18+)

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // Consider restricting this to your domain
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const textToSummarize = (body.text || "").toString();

    if (!textToSummarize.trim()) {
      return json(400, { error: "No text provided to summarize." });
    }

    // Trim to a reasonable size to avoid huge payloads
    const MAX_CHARS = 12000;
    const inputText = textToSummarize.length > MAX_CHARS
      ? textToSummarize.slice(0, MAX_CHARS) + "\n\n[Text truncated for summary]"
      : textToSummarize;

    // Choose provider based on available keys
    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!groqKey && !openaiKey) {
      return json(500, { error: "No AI provider configured. Set GROQ_API_KEY or OPENAI_API_KEY." });
    }

    let provider = groqKey ? "groq" : "openai";
    let endpoint, headers, payload;

    if (provider === "groq") {
      endpoint = "https://api.groq.com/openai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      };
      payload = {
        model: "llama3-70b-8192",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "You are a concise technical summarizer. Produce a short, readable summary (3-6 bullet points or 1 short paragraph).",
          },
          {
            role: "user",
            content: `Summarize the following content for a note page. Focus on key points and keep it brief.\n\n${inputText}`,
          },
        ],
        max_tokens: 220,
      };
    } else {
      endpoint = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      };
      payload = {
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "You are a concise technical summarizer. Produce a short, readable summary (3-6 bullet points or 1 short paragraph).",
          },
          {
            role: "user",
            content: `Summarize the following content for a note page. Focus on key points and keep it brief.\n\n${inputText}`,
          },
        ],
        max_tokens: 220,
      };
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return json(resp.status, {
        error: data.error?.message || data.error || `Upstream error (${resp.status})`,
        provider,
      });
    }

    // Extract summary depending on provider shape
    const summary = data.choices?.[0]?.message?.content?.trim();
    if (!summary) {
      return json(500, { error: "No summary returned from AI provider.", provider });
    }

    return json(200, { summary, provider });
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" });
  }
};
