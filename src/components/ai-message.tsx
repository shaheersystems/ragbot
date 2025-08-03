"use client";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";

const AiMessage = ({ content }: { content: string }) => {
  return <AIResponse className="font-inter">{content}</AIResponse>;
};

export default AiMessage;
