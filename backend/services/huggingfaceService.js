const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;

const MODEL =
  "mistralai/Mistral-7B-Instruct-v0.3";

async function generateAIResponse(review) {
  try {
    const prompt = `
You are a hotel review assistant.

Analyze this review:

"${review}"

Return ONLY JSON in this format:

{
"summary":"",
"sentiment":"",
"priority":"",
"response":""
}

Priority Rules:
Positive -> Low
Neutral -> Medium
Negative -> High
`;

    const result = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let text = result.data[0].generated_text;

    // remove prompt
    text = text.replace(prompt, "").trim();

    // extract JSON
    const json = text.match(/\{[\s\S]*\}/);

    if (!json) {
      throw new Error("No JSON returned");
    }

    return JSON.parse(json[0]);
  } catch (err) {
    console.log(
      err.response?.data || err.message
    );

    throw new Error("HuggingFace AI failed");
  }
}

module.exports = {
  generateAIResponse,
};