"use client";

import { useEffect } from "react";
import AskJunkie from "ask-junkie-sdk";
import "ask-junkie-sdk/dist/ask-junkie.css";

export function SuZuChat() {
  useEffect(() => {
    // Initialize SuZu only once
    AskJunkie.init({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      provider: "groq",
      botName: "SuZu",
      welcomeMessage: "Hi! I'm SuZu. Ask me anything about Abeen's experience, skills, or projects!",
      position: "bottom-right",
      theme: {
        mode: "gradient",
        preset: 1,
        primary: "#f59e0b", // Amber (matches your site theme)
        secondary: "#0f172a", // Dark navy
      },
      suggestions: ["What is Abeen's tech stack?", "Tell me about his PM experience", "Show me his blog"],
      context: {
        siteName: "Abeen Poudel",
        siteDescription: "Portfolio of Abeen Poudel, a Product Manager and Certified Scrum Master based in Nepal.",
        customInfo: "He specializes in Agile, Scrum, and Product Management. He also writes a blog on his site about tech and management in Nepal.",
      },
    });
  }, []);

  return null; // The SDK handles the UI
}