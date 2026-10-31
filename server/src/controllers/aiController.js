const { GoogleGenAI } = require('@google/genai');
const logger = require('../config/logger');

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenAI({ apiKey });
};

const generateInsights = async (req, res, next) => {
  try {
    const { payload, prompt: userPrompt } = req.body;
    const inputContent = userPrompt || (payload ? JSON.stringify(payload) : "Hello");

    const ai = getGeminiClient();
    const prompt = `You are an AI assistant for Prodesk Platform. Answer concisely: ${inputContent}`;

    // Direct, fast single API call to standard production model
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    logger.info('Successfully generated AI Insights via proxy');
    
    return res.status(200).json({
      success: true,
      insight: response.text,
      reply: response.text,
      message: response.text
    });
  } catch (error) {
    // Graceful error handle - Bina kisi app crash ke clear message
    if (error.status === 503 || (error.message && error.message.includes('503'))) {
      return res.status(200).json({
        success: true,
        insight: "Google AI server is temporarily busy. Please resend your message.",
        reply: "Google AI server is temporarily busy. Please resend your message.",
        message: "Google AI server is temporarily busy. Please resend your message."
      });
    }
    next(error);
  }
};

module.exports = { generateInsights };