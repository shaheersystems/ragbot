import { SYSTEM_PROMPT } from "@/ai/prompts";
import { google } from "@/ai/providers/google";
import { searchDocumentation } from "@/ai/tools/search-documentation";
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
        searchDocumentation,
      },
      stopWhen: stepCountIs(5),
    });
    return result.toUIMessageStreamResponse();
  } catch (e) {
    throw e;
  }
}
