import data from "./bangs.json";
import { extraBangs } from "./extra";

// Combine the generated JSON with our hand-maintained extras so they work at runtime.
export const bangs: Record<string, any> = {
  ...data,
  ...extraBangs,
};
