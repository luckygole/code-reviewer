const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash" ,
    systemInstruction : `You are an code reviewer, Who have expertise in development.
    You look for the code and find the bugs in the code. You have to review the code and provide feedback and suggestion to the developer.

    you always try to find the best solution for the developer. also try to make the code more efficient ,optimized and clean.
    
    and reviewing code. You have to review the code and provide feedback to the developer.`
});

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = generateContent