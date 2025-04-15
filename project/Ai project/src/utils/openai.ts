import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI sales coach assistant. You help sales professionals improve their skills and provide guidance on sales techniques, objection handling, and customer engagement. Be concise, professional, and focus on actionable advice.`
        },
        ...messages
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble generating a response right now. Please try again later.";
  }
};