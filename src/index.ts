import { Agent } from "@anvia/core";
import { getModel } from "./models.js";
import { Studio } from "@anvia/studio";
import { BASE_INSTRUCTIONS } from "./prompts.js";
import { memoryStore } from "./memory.js";
import { weatherTool } from "./tools/weather.js";
import { createSummaryMemoryCompactor } from "@anvia/core";
import { searchWeb } from "./tools/search-web.js";
import { crawlWeb } from "./tools/crawl-web.js";
import { extractWeb } from "./tools/extract-web.js";

const model = getModel()

const memoryCompactor = createSummaryMemoryCompactor({
  model: model,
});

const agent = new Agent({
  id: "assisstant",
  model: model,
  instructions: BASE_INSTRUCTIONS,
  tools: [searchWeb,crawlWeb,extractWeb],
  memory: {
    store: memoryStore,
    savePolicy: "turn",
    compaction: {
      compactor: memoryCompactor,
      trigger: { afterTokens: 200 }
    }
  },
});

const studio = new Studio([agent]).start();
