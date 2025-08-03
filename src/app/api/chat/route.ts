import { SYSTEM_PROMPT } from "@/ai/prompts";
import { google } from "@/ai/providers/google";
import { search_documentation } from "@/ai/tools/search-documentation";
import { stepCountIs, convertToModelMessages, streamText } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: convertToModelMessages(messages),
      tools: {
        search_documentation,
      },
      stopWhen: stepCountIs(5),
    });
    return result.toUIMessageStreamResponse();
  } catch (e) {
    throw e;
  }
}
