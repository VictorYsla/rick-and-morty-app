const isProduction = process.env.NODE_ENV === "production";

export const baseURL = isProduction
  ? process?.env?.NEXT_BASE_URL
  : process?.env?.NEXT_PUBLIC_BASE_URL;
