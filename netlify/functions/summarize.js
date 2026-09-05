// Netlify Function: netlify/functions/summarize.js
// CommonJS export for broad Netlify compatibility; uses native fetch (Node 18+)

// Origins allowed to call this function. The static site lives on GitHub Pages
// (mgilak.ir), the function is hosted on Netlify, and localhost covers dev.
const ALLOWED_ORIGINS = new Set([
  "https://mgilak.ir",
  "https://www.mgilak.ir",
  "https://mgilak.netlify.app",
]);

// Resolve the CORS Allow-Origin based on the request's Origin header so we
// never return a wildcard "*" (which would let any site burn our AI quota).
function corsHeaders(event) {
  const origin = (event.headers && (event.headers["origin"] || event.headers["Origin"])) || "";
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(statusCode, body, event) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders(event) },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(event), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." }, event)
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const textToSummarize = (body.text || "").toString();

    if (!textToSummarize.trim()) {
      return json(400, { error: "No text provided to summarize." }, event)
    }

    // Trim to a reasonable size to avoid huge payloads
    const MAX_CHARS = 8000;
    const inputText = textToSummarize.length > MAX_CHARS
      ? textToSummarize.slice(0, MAX_CHARS) + "\n\n[Text truncated for summary]"
      : textToSummarize;

    // Choose provider based on available keys (Priority: OpenCode Zen > Gemini > Groq > OpenAI)
    const zenKey = process.env.OPENCODE_ZEN_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!zenKey && !geminiKey && !groqKey && !openaiKey) {
      return json(500, { error: "No AI provider configured. Set OPENCODE_ZEN_API_KEY, GEMINI_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY." }, event)
    }

    let provider = zenKey ? "opencode-zen" : (geminiKey ? "gemini" : (groqKey ? "groq" : "openai"));
    let endpoint, headers, payload;

    // ==================== OPENCODE ZEN PROVIDER ====================
    // OpenAI-compatible chat/completions. Free models (e.g. mimo-v2.5-free)
    // and low-cost models (e.g. deepseek-v4-flash) are served here.
    if (provider === "opencode-zen") {
      endpoint = "https://opencode.ai/zen/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zenKey}`,
      };
      payload = {
        model: process.env.OPENCODE_ZEN_MODEL || "mimo-v2.5-free",
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
        }, event)
      }

      const summary = data.choices?.[0]?.message?.content?.trim();
      if (!summary) {
        return json(500, { error: "No summary returned from AI provider.", provider }, event)
      }

      return json(200, { summary, provider }, event)

    // ==================== GEMINI PROVIDER ====================
    } else if (provider === "gemini") {
      const model = process.env.GEMINI_MODEL || "gemini-1.5-flash"; // or "gemini-1.5-pro"
      
      // Gemini uses a different endpoint structure
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      
      payload = {
        contents: [
          {
            parts: [
              {
                text: `You are an expert academic summarizer specializing in technical and educational content. Your summaries are comprehensive yet concise, highlighting the main concepts, key insights, and practical takeaways. Format your response with clear structure using bullet points or short paragraphs.

Please provide a comprehensive summary of the following educational note. Include:

1. Main topic and purpose
2. Key concepts explained
3. Important formulas, definitions, or findings (if any)
4. Practical applications or takeaways

Be informative and structured, but keep it readable.

Content:
${inputText}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 400,
        }
      };

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        return json(resp.status, {
          error: data.error?.message || data.error || `Upstream error (${resp.status})`,
          provider,
        }, event)
      }

      // Extract summary from Gemini response
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!summary) {
        return json(500, { error: "No summary returned from Gemini.", provider }, event)
      }

      return json(200, { summary, provider }, event)

    // ==================== GROQ PROVIDER ====================
    } else if (provider === "groq") {
      endpoint = "https://api.groq.com/openai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      };
      payload = {
        model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
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
        }, event)
      }

      const summary = data.choices?.[0]?.message?.content?.trim();
      if (!summary) {
        return json(500, { error: "No summary returned from AI provider.", provider }, event)
      }

      return json(200, { summary, provider }, event)

    // ==================== OPENAI PROVIDER ====================
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
        }, event)
      }

      const summary = data.choices?.[0]?.message?.content?.trim();
      if (!summary) {
        return json(500, { error: "No summary returned from AI provider.", provider }, event)
      }

      return json(200, { summary, provider }, event)
    }
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" }, event)
  }
};