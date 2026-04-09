import { GoogleGenAI, Type } from "@google/genai";
import { MarketCondition, Supplier, LogisticsMetric, DemandPattern, OptimizationStrategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStrategies(
  marketConditions: MarketCondition[],
  suppliers: Supplier[],
  logistics: LogisticsMetric[],
  demand: DemandPattern[]
): Promise<OptimizationStrategy[]> {
  const prompt = `
    As a Supply Chain Intelligence AI, analyze the following data and generate 3-4 highly specific optimization strategies.
    
    Market Conditions: ${JSON.stringify(marketConditions)}
    Suppliers: ${JSON.stringify(suppliers)}
    Logistics: ${JSON.stringify(logistics)}
    Demand Patterns: ${JSON.stringify(demand)}
    
    Focus on procurement, inventory, distribution, and risk mitigation.
    Provide the output in a structured JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                enum: ['Procurement', 'Inventory', 'Distribution', 'Risk Mitigation']
              },
              description: { type: Type.STRING },
              actions: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              expectedImpact: {
                type: Type.OBJECT,
                properties: {
                  costReduction: { type: Type.STRING },
                  efficiencyGain: { type: Type.STRING },
                  riskReduction: { type: Type.STRING }
                },
                required: ['costReduction', 'efficiencyGain', 'riskReduction']
              },
              priority: { 
                type: Type.STRING,
                enum: ['Critical', 'High', 'Medium']
              }
            },
            required: ['title', 'category', 'description', 'actions', 'expectedImpact', 'priority']
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating strategies:", error);
    return [];
  }
}

export async function runScenarioAnalysis(
  scenarioDescription: string,
  currentData: any
): Promise<string> {
  const prompt = `
    Analyze the following supply chain scenario: "${scenarioDescription}"
    Current Data Context: ${JSON.stringify(currentData)}
    
    Provide a detailed cost analysis and impact assessment. Use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Error running scenario analysis:", error);
    return "Error occurred during analysis.";
  }
}
