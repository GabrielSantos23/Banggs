import data from "./bangs.json";
// Re-export as object any to satisfy main.ts expectations
export const bangs: Record<string, any> = data as any;
