const DataItem = require('../models/DataItem');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../config/logger');

const createEnrichedItem = async (req, res, next) => {
  try {
    const { title, rawContent } = req.body;

    if (!title || !rawContent) {
      return res.status(400).json({ success: false, message: 'Title and rawContent are required' });
    }

    let category = 'General';
    let tags = ['general'];
    let aiSummary = rawContent.substring(0, 100);

    try {
      if (process.env.GEMINI_API_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Analyze this text and respond ONLY with valid JSON having keys: "category", "tags" (array of strings), and "summary". Text: "${rawContent}"`;
        
        const response = await model.generateContent(prompt);
        const cleanedText = response.response.text().replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanedText);

        category = parsed.category || category;
        tags = Array.isArray(parsed.tags) ? parsed.tags : tags;
        aiSummary = parsed.summary || aiSummary;
      }
    } catch (aiErr) {
      logger.warn(`AI Enrichment fallback executed: ${aiErr.message}`);
    }

    const newItem = await DataItem.create({
      title,
      rawContent,
      category,
      tags,
      aiSummary,
    });

    logger.info(`DataItem created and enriched: ${newItem._id}`);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await DataItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

module.exports = { createEnrichedItem, getItems };