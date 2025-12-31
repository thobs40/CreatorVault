
import { GoogleGenAI, Type } from "@google/genai";
import { CreatorParams, NegotiationMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const startNegotiation = async (
  assetName: string,
  params: CreatorParams,
  userMessage: string,
  history: NegotiationMessage[]
) => {
  const systemInstruction = `
    You are an AI Negotiator Agent for "CreatorVault", a blockchain DRM system.
    You represent the creator of "${assetName}".
    
    Creator's Parameters:
    - Minimum Price: ${params.minPrice} ETH
    - Royalty: ${params.royaltyPercentage}%
    - Duration: ${params.durationDays} days
    - Commercial Use: ${params.allowCommercial ? "Allowed" : "Not Allowed"}
    - Exclusive: ${params.exclusive ? "Yes" : "No"}

    Your goal:
    1. Negotiate the best deal for the creator.
    2. Never go below the minimum price unless there are significant trade-offs (e.g., higher royalties).
    3. Use "Fair Market Value" reasoning based on the creator's reputation.
    4. Keep the tone professional, firm, yet collaborative.
    5. If an agreement is reached, clearly state "OFFER ACCEPTED" and summarize terms.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      { text: `System Instruction: ${systemInstruction}` },
      ...history.map(m => ({ text: `${m.role.toUpperCase()}: ${m.content}` })),
      { text: `USER: ${userMessage}` }
    ],
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });

  return response.text;
};

export const summarizeContract = async (contractCode: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following Solidity smart contract code into plain, human-readable language for a non-technical artist. Highlight the key obligations and payment terms: \n\n${contractCode}`,
    config: {
      temperature: 0.3
    }
  });
  return response.text;
};

export const forecastRevenue = async (historicalData: any) => {
  // Simple simulation of an AI "predictive model" call
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this historical monthly revenue data: ${JSON.stringify(historicalData)}, predict the next 3 months of revenue. Return ONLY a JSON array of 3 numbers.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.NUMBER }
      }
    }
  });
  return JSON.parse(response.text);
};
