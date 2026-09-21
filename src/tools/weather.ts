import { createTool } from "@anvia/core";
import { z } from "zod";

export const weatherTool = createTool({
  name: "getWeather",
  description: "use this tool to get the weather for a given location.",
  inputSchema: z.object({
    locaiton: z.string(),
  }),
  execute: async (args) => {
    return 'The weather in ${args.location} is sunny at 35 degrees'
  }
});
