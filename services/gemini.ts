
import { GoogleGenAI, Type } from "@google/genai";

export const getMediaMetadata = async (url: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this URL and extract metadata: ${url}. 
      The user is interested in content from YouTube or TikTok. 
      If it's a valid link from these platforms, return a JSON object with title, author, thumbnail, and duration. 
      If it looks invalid or restricted, return an error message with isValid: false.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            author: { type: Type.STRING },
            thumbnail: { type: Type.STRING, description: "A placeholder URL or extracted image URL" },
            duration: { type: Type.STRING },
            isValid: { type: Type.BOOLEAN },
            errorMessage: { type: Type.STRING }
          },
          required: ["isValid"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { isValid: false, errorMessage: "Failed to connect to media engine." };
  }
};
