



import dotenv from "dotenv";
dotenv.config();


import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (customerMessage, business) => {
  try {
    const productsList =
      business?.products && business.products.length > 0
        ? business.products.map((p) => `${p.name} - ${p.price}`).join(", ")
        : "No products available";

    const prompt = `
Customer Message: ${customerMessage}
Business Name: ${business?.name || "Unknown Business"}
Business Address: ${business?.address || "Not provided"}
Products: ${productsList}

Reply politely. If the customer asks about products, suggest relevant ones.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI sales assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices?.[0]?.message?.content || "Sorry, no response generated.";
  } catch (err) {
    console.error("❌ askAI error:", err.message);
    return "Sorry, I couldn't process your message right now.";
  }
};