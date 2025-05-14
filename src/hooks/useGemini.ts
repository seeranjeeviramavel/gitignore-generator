// hooks/useGemini.ts
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const model = "gemini-2.5-flash-preview-04-17";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export function useGemini() {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async (input: string, onChunk?: (chunk: string) => void) => {
    setLoading(true);
    setResponseText("");

    const contents = [
      {
        role: "user",
        parts: [{ text: input }],
      },
    ];

    try {
      const response = await genAI.models.generateContentStream({
        model,
        config: { responseMimeType: "text/plain" },
        contents,
      });

      let fullResponse = "";

      for await (const chunk of response) {
        const text = chunk.text || "";
        fullResponse += text;
        setResponseText((prev) => prev + text);
        onChunk?.(text);
      }

      return fullResponse;
    } catch (err) {
      console.error("Gemini error:", err);
      setResponseText("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return { responseText, loading, generate };
}
