import { tool } from "ai";
import { getContext } from "@/lib/get-context";
import { z } from "zod";

export const search_documentation = tool({
  name: "search_documentation",
  description:
    "get information from Astra db and cassandra docs to answer user's queries.",
  inputSchema: z.object({
    query: z.string().describe("User's query"),
  }),
  execute: async ({ query }) => {
    console.log("-- SEARCH DOCUMENTATION TOOL IS CALLED --");
    const { context, sources } = await getContext(query);
    return { context, sources };
  },
});
