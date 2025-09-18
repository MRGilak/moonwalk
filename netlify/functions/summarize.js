// netlify/functions/summarize.js
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body || "{}");
    const textToSummarize = body.text || "";

    if (!textToSummarize) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No text provided to summarize." }),
      };
    }

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Summarize this text:\n\n${textToSummarize}`,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No summary returned from API." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ summary: data.choices[0].text.trim() }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
