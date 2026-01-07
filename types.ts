export interface ProductBusiness {
  keyword: string;
  productTitle: string;
  productSOP: string; 
  automationRecipe: string;
  price: string;
  deploymentPayload: string; // Native Notion API JSON (Nested)
  flatPayload: string; // Simplified Flat JSON for Zapier/Catch Hooks
  notionAiPrompt: string; // The "Secret Sauce" prompt for Notion AI
  portalUrl: string; // Unique URL for the Notion deployment portal
  notionSchema?: {
    properties: Array<{ name: string; type: string; options?: string[] }>;
  };
}

export type FrameworkID = 
  | 'standard' 
  | 'four_pillar' 
  | 'notion_architect' 
  | 'lead_machine' 
  | 'marketing_manager' 
  | 'growth_engine' 
  | 'first_principles' 
  | 'triz' 
  | 'lateral'
  | 'integration_architect';

export interface Framework {
  id: FrameworkID;
  name: string;
  description: string;
  prompt: string;
}

export interface AppState {
  isGenerating: boolean;
  generationStep: string;
  businessData: ProductBusiness | null;
  error: string | null;
  connectionStatus: 'idle' | 'authorizing' | 'syncing' | 'verified' | 'failed';
  toast: { message: string; type: 'success' | 'error' } | null;
  selectedFramework: FrameworkID;
}

export type AppTab = 'sop' | 'recipe' | 'portal' | 'diagnostics';

export const PRODUCT_ENGINE_SOURCE = "2cdc1cad18328179943dfca6195cf2bf";
