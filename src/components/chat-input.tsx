"use client";

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Square } from "lucide-react";

type ChatInputProps = {
  handleSubmit: () => void;
  setInput: (input: string) => void;
  input: string;
  status: "submitted" | "streaming" | "error" | "ready";
};

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  status,
}: ChatInputProps) {
  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={status === "submitted" || status === "streaming"}
      onSubmit={handleSubmit}
      className="w-full"
    >
      <PromptInputTextarea placeholder="Ask me anything..." />

      <PromptInputActions className="flex items-center justify-end gap-2 pt-2">
        <PromptInputAction
          tooltip={
            status === "streaming" || status === "submitted"
              ? "Stop generation"
              : "Send message"
          }
        >
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleSubmit}
            disabled={status === "submitted" || input.trim() === ""}
          >
            {status === "submitted" || status === "streaming" ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
