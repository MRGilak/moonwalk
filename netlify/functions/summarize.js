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
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You are an expert academic summarizer specializing in technical and educational content. Your summaries are comprehensive yet concise, highlighting the main concepts, key insights, and practical takeaways. Format your response with clear structure using bullet points or short paragraphs.",
          },
          {
            role: "user",
            content: `Please provide a comprehensive summary of the following educational note. Include:\n\n1. Main topic and purpose\n2. Key concepts explained\n3. Important formulas, definitions, or findings (if any)\n4. Practical applications or takeaways\n\nBe informative and structured, but keep it readable.\n\nContent:\n${inputText}`,
          },
        ],
        max_tokens: 400,
      };
    } else {
      endpoint = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      };
      payload = {
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You are an expert academic summarizer specializing in technical and educational content. Your summaries are comprehensive yet concise, highlighting the main concepts, key insights, and practical takeaways. Format your response with clear structure using bullet points or short paragraphs.",
          },
          {
            role: "user",
            content: `Please provide a comprehensive summary of the following educational note. Include:\n\n1. Main topic and purpose\n2. Key concepts explained\n3. Important formulas, definitions, or findings (if any)\n4. Practical applications or takeaways\n\nBe informative and structured, but keep it readable.\n\nContent:\n${inputText}`,
          },
        ],
        max_tokens: 400,
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
