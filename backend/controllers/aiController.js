const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

const analyzeReview = async (req, res) => {
    try {
        const { review } = req.body;

        if (!review) {
            return res.status(400).json({
                success: false,
                message: "Review text is required"
            });
        }

        const prompt = `
You are an AI hotel feedback analyzer.

Analyze this guest review:

"${review}"

Return ONLY JSON in this format:
{
 "sentiment":"",
 "keyPoints":"",
 "response":""
}

Do not add markdown or explanations.
        `;

        const response = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        
        const result = JSON.parse(response.choices[0].message.content);

        res.json({
            success: true,
            analysis: result
        });

    } catch (error) {
        console.error("AI Error:", error.message);
        
        
        let fallbackResult = {
            sentiment: "Neutral",
            keyPoints: "Unable to analyze review",
            response: "We appreciate your feedback and will review your comments."
        };

        res.status(500).json({
            success: false,
            message: "AI service failed",
            analysis: fallbackResult
        });
    }
};

module.exports = { analyzeReview };