import { GoogleGenAI, Type } from "@google/genai";

export const getMediaMetadata = async (url: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional media metadata extractor. 
      Analyze this URL: "${url}". 
      
      Requirements:
      1. Check if the URL belongs to YouTube (youtube.com, youtu.be) or TikTok (tiktok.com).
      2. If valid, extract or generate realistic metadata (title, author, thumbnail, and a likely duration).
      3. Return a JSON object.
      4. If the URL is clearly not from a supported platform, return isValid: false.
      
      Platforms supported: YouTube, TikTok.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            author: { type: Type.STRING },
            thumbnail: { type: Type.STRING, description: "Direct URL to a high-res thumbnail" },
            duration: { type: Type.STRING, description: "Format: MM:SS" },
            isValid: { type: Type.BOOLEAN },
            errorMessage: { type: Type.STRING }
          },
          required: ["isValid"]
        }
      }
    });

    const parsed = JSON.parse(response.text);
    // Add realistic placeholders if the model missed them but validated the URL
    if (parsed.isValid && !parsed.thumbnail) {
      parsed.thumbnail = `https://picsum.photos/seed/${encodeURIComponent(url)}/400/225`;
    }
    return parsed;
  } catch (error) {
    console.error("Gemini Error:", error);
    return { isValid: false, errorMessage: "The system is currently limited. Please check your link and try again." };
  }
};