const OpenAI = require("openai");


const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});


exports.analyzeReview = async (req,res)=>{

    try{

        const {review} = req.body;


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

            model:"openai/gpt-4o-mini",

            messages:[
                {
                    role:"user",
                    content:prompt
                }
            ]

        });

        const result = JSON.parse(
        response.choices[0].message.content
        );


        res.json({
            success:true,
            analysis:result
        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"AI service failed"
        });

    }

};