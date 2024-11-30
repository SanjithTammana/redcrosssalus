import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { message, history, systemPrompt } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // Constant initial message setup
    const initialMessage = {
      role: "assistant",
      content: systemPrompt.includes("Emergency Assistant")
        ? "I’m your Red Cross Emergency Assistant. First, please provide the patient’s details (age, sex, weight, allergies, medications, and any family medical history). If you haven’t already, call 911 immediately for emergencies."
        : "Welcome to Practice Mode! I’m here to guide you through first aid and emergency preparedness.",
    };

    const messages = [
      { role: "system", content: systemPrompt },
      initialMessage,
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseMessage =
      chatCompletion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
