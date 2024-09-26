import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação.";
  }
};