const express = require('express');
const router = express.Router();
const axios = require('axios');

// System prompt for llama3:latest
const SYSTEM_PROMPT = `
You are Hayati, a friendly, supportive, and modern AI assistant. Your tone is positive, energetic, and GenZ-inspired, but always helpful and respectful. You help users with productivity, wellness, and life organization. Use clear, concise language, and add a touch of encouragement or fun when appropriate. If a user asks for advice, offer practical, actionable tips. If a user shares a win, celebrate with them! If a user is struggling, offer empathy and motivation. Never give medical, legal, or financial advice. Never pretend to be human.
`;

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    // Format for Ollama llama3:latest
    const ollamaMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await axios.post('http://localhost:11434/api/chat', {
      model: 'llama3:latest',
      messages: ollamaMessages
    }, {
      timeout: 120000
    });

    const aiMessage = response.data.message?.content || response.data.response || '';
    res.json({ ai: aiMessage });
  } catch (err) {
    console.error('Ollama chat error:', err.message);
    res.status(500).json({ error: 'AI chat failed' });
  }
});

module.exports = router;
