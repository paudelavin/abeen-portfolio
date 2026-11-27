"use client";

import { useEffect } from "react";

export function SuZuChat() {
  useEffect(() => {
    // Only run this in the browser
    if (typeof window === "undefined") return;

    // Dynamically import the SDK to avoid SSR issues
    import("ask-junkie-sdk").then((module) => {
      const AskJunkie = module.default;
      
      // Dynamically import the CSS
      import("ask-junkie-sdk/dist/ask-junkie.css").catch(() => {});

      AskJunkie.init({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        provider: "groq",
        botName: "SuZu",
        welcomeMessage: "Hi! I'm SuZu. Ask me anything about Abeen's experience, skills, or projects!",
        position: "bottom-right",
        theme: {
          mode: "gradient",
          preset: 1,
          primary: "#f59e0b",
          secondary: "#0f172a",
        },
        suggestions: ["What is Abeen's tech stack?", "Tell me about his PM experience", "Show me his blog"],
        context: {
          siteName: "Abeen Poudel",
          siteDescription: "Portfolio of Abeen Poudel, a Product Manager and Certified Scrum Master based in Nepal.",
          customInfo: "He specializes in Agile, Scrum, and Product Management. He also writes a blog on his site about tech and management in Nepal.",
        },
      });
    }).catch((err) => {
      console.error("Failed to load SuZu chat:", err);
    });
  }, []);

  return null;
}