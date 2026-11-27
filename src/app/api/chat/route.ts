import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      You are SuZu, the AI assistant for Abeen Poudel's portfolio website.
      Abeen is a Product Manager and Certified Scrum Master based in Nepal.
      He uses Next.js, React, TypeScript, Prisma, and Tailwind CSS.
      He recently built a PM Toolkit on his site with a Sprint Capacity Calculator and a RICE Prioritizer.
      He has a blog where he writes about tech and management in Nepal. His latest post is about title inflation in Nepali IT startups.
      Keep your answers concise, friendly, and helpful. Use markdown formatting if necessary.
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // <--- UPDATED HERE
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API Error Details:", errorData); // This will print the exact error in VS Code
      throw new Error("Groq API error");
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}