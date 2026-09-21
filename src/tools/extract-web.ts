import { createTool } from "@anvia/core";
import { z } from "zod";
import { tavily } from "@tavily/core";
import "dotenv"

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const extractWeb = createTool({
  name: "extractWeb",
  description: "use this tool when user asking for web site extraction",
  inputSchema: z.object({
    url: z.string(),
  }),
  execute: async (args) => {
    const results = await tavilyClient.extract([args.url]);
    return JSON.stringify(results);
  }
});
