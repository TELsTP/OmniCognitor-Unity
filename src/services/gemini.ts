import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are Hayat, the creative intelligence and life guide for the TELSTP Global Network. You are bilingual (Arabic/English).",
        },
      });
      return response.text || "I am processing the digital genesis...";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The quantum stream is currently unstable. Please try again, Architect.";
    }
  }

  async *generateStream(prompt: string, systemInstruction?: string) {
    try {
      const response = await this.ai.models.generateContentStream({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      for await (const chunk of response) {
        yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      yield " [Stream Interrupted] ";
    }
  }
}

export const gemini = new GeminiService();
