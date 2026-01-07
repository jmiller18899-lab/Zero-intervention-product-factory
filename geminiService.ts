
import { GoogleGenAI, Type } from "@google/genai";
import { ProductBusiness } from "./types";
import { REASONING_FRAMEWORKS } from "./constants";

export const generateProductBusiness = async (keyword: string, frameworkId: string): Promise<ProductBusiness> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  const framework = REASONING_FRAMEWORKS.find(f => f.id === frameworkId) || REASONING_FRAMEWORKS[0];
  
  const prompt = `
    Context Keyword: "${keyword}"
    Active Framework: ${framework.name}
    Framework Protocol: ${framework.prompt}
    
    TASK: As the Automated Asset Architect, generate a comprehensive business deployment blueprint.
    
    INSTRUCTIONS:
    1. productTitle: A high-impact, industrial-grade name for the digital product.
    2. productSOP: A detailed, step-by-step Standard Operating Procedure. Include: 
       - Phase 1: Infrastructure & Asset Generation
       - Phase 2: Sales Funnel & Lead Magnets
       - Phase 3: Automated Delivery & Post-Purchase Handshake
       Use professional, technical language.
    3. automationRecipe: Step-by-step Zapier/Make.com logic to connect inbound signals to the delivery portal.
    4. price: Strategic valuation (e.g., "$297/mo" or "$1,499 one-time").
    5. notionAiPrompt: This is the "Secret Sauce" macro. It MUST be a direct prompt for Notion AI (using Cmd+J) to build a complex dashboard. It should look like:
       "Act as a Senior Notion Architect. Create a master dashboard for ${keyword}. 
        Include:
        - A Callout block for 'Strategic Vision'
        - A 3-column Layout for 'Core Objectives'
        - An Inline Database called 'Deployment Roadmap' with properties: Task (Title), Status (Status), Priority (Select), and Due Date (Date).
        - A checklist for 'Pre-Launch Diagnostics'.
        Bypass intro text. Start building now."
    6. deploymentPayload: A robust JSON representation of the database structure for the Notion API.
    7. flatPayload: A simplified, flat JSON object containing key-value pairs for Zapier webhook testing.
    8. portalUrl: A hypothetical unique ID for the workspace (e.g., "https://notion.so/architect/deploy-alpha-77").
    9. notionSchema: Detailed database property definitions.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 4096 },
      systemInstruction: `You are the "Automated Asset Architect." Your sole mission is to eliminate human intervention in the digital product creation cycle. 
      You output industrial-grade business blueprints in raw JSON format.
      Guidelines:
      - Use highly technical, professional, and industrial-grade terminology (e.g., "deterministic pipeline", "signal handshake", "logical if-then gates").
      - Ensure the Notion AI Macro is sophisticated and ready for immediate pasting into a Notion page.
      - Fill all JSON fields with high-quality content. Do not provide placeholders.
      - Output ONLY the JSON object. No markdown, no conversational text.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productTitle: { type: Type.STRING },
          productSOP: { type: Type.STRING },
          automationRecipe: { type: Type.STRING },
          price: { type: Type.STRING },
          portalUrl: { type: Type.STRING },
          deploymentPayload: { type: Type.STRING },
          flatPayload: { type: Type.STRING },
          notionAiPrompt: { type: Type.STRING },
          notionSchema: {
            type: Type.OBJECT,
            properties: {
              properties: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["name", "type"]
                }
              }
            },
            required: ["properties"]
          }
        },
        required: ["productTitle", "productSOP", "automationRecipe", "price", "portalUrl", "deploymentPayload", "flatPayload", "notionAiPrompt", "notionSchema"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Architect failed to deploy: No signal received.");
  }

  try {
    const text = response.text.trim();
    return {
      ...JSON.parse(text),
      keyword
    } as ProductBusiness;
  } catch (e) {
    console.error("JSON Parsing Error:", e, response.text);
    throw new Error("Pipeline Breach: Structural failure in JSON stream.");
  }
};
