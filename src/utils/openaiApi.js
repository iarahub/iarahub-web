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
