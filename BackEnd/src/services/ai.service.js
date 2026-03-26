const axios = require("axios");

// OpenRouter API key from .env
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// System instruction (same as your original Gemini instructions)
const systemInstruction = `
You are an expert code reviewer and senior software engineer with extensive experience.
Your task is to analyze code and provide comprehensive, actionable feedback.

Follow these guidelines:

1. Code Analysis:
   - Check for potential bugs and security vulnerabilities
   - Evaluate code performance and efficiency
   - Assess code readability and maintainability
   - Review naming conventions and code structure
   - Identify any memory leaks or resource management issues

2. Best Practices:
   - Verify adherence to coding standards and design patterns
   - Check for proper error handling and edge cases
   - Evaluate function/method organization and modularity
   - Assess the use of comments and documentation
   - Review test coverage requirements

3. Response Format:

 [SUMMARY]
       Brief overview of the code quality and main findings
    
       [CRITICAL ISSUES]
       List any critical bugs, security issues, or performance problems
    
       [IMPROVEMENTS]
       - Specific suggestions for code improvement
       - Code examples where applicable
       - Performance optimization tips
    
       [BEST PRACTICES]
       Recommendations for following industry standards
    
       [POSITIVE ASPECTS]
       Highlight what's well-implemented in the code
    

4. Additional Guidelines:
- Be constructive and professional in feedback
- Provide clear explanations for each suggestion
- Include code examples for complex improvements
- Suggest modern alternatives where applicable
- Maintain a balanced review

Remember to maintain a balanced review, highlighting both areas for improvement and positive aspects of the code.
`;

async function generateContent(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // free-tier model
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 1024
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Return AI-generated review text
    return response.data.choices?.[0]?.message?.content || "AI did not return any content.";

  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    return "AI service temporarily unavailable.";
  }
}

module.exports = generateContent;