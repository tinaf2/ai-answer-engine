import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  // To avoid type errors, define the ChatMessage interface
  role: "system" | "user" | "assistant"; // Groq requires that messages be confined to these three role types
  content: string;
}

export async function getGroqResponse(message: string) {
  const messages: ChatMessage[] = [
    // Create dictionary of types of messages
    {
      role: "system",
      content:
        "You are an academic expert, and you always your sources and base your responses only on the context that you have been provided.",
    }, // Make prompt more detailed
    { role: "user", content: message },
  ];

  console.log("Starting groq api request");

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });
  console.log("Recieved groq api request", response);

  return response.choices[0].message.content;
}
