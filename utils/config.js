const isDev = process.env.NODE_ENV !== "production";

export const BASE_URL = isDev ? "http://localhost:3000" : "https://b3k3n-nine.vercel.app";