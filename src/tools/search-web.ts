import { createTool } from "@anvia/core";
import { z } from "zod";
import { tavily } from "@tavily/core";
import "dotenv"

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const searchWeb = createTool({
  name: "searchWeb",
  description: "use this tool when user asking for real time web search result",
  inputSchema: z.object({
    query: z.string(),
  }),
  execute: async (args) => {
    const results = await tavilyClient.search(args.query, {
      includeAnswer: true,
      includeRawContent: "markdown",
    });


    return JSON.stringify(results);
  }
});
