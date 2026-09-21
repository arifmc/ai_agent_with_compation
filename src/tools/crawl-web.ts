import { createTool } from "@anvia/core";
import { z } from "zod";
import { tavily } from "@tavily/core";
import "dotenv"

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const crawlWeb = createTool({
  name: "crawlWeb",
  description: "use this tool when user asking for web site crawling",
  inputSchema: z.object({
    url: z.string(),
  }),
  execute: async (args) => {
    const results = await tavilyClient.crawl(args.url, {
      maxDepth: 2,
      limit: 20,
      format: "markdown"
    });


    return JSON.stringify(results);
  }
});
