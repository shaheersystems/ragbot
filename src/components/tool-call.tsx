"use client";

import { Tool } from "@/components/ui/tool";
import { type Source } from "@/store/sources.store";
import { useStore } from "exome/react";
import { sourcesStore } from "@/store";
import { useEffect } from "react";

type ToolCallProps = {
  state:
    | "output-available"
    | "input-streaming"
    | "input-available"
    | "output-error";
  type: `tool-${string}`;
  input: Record<string, unknown>;
  output?: unknown;
};

export function ToolCall({ state, type, input, output }: ToolCallProps) {
  const { addSources } = useStore(sourcesStore);
  useEffect(() => {
    if (output && typeof output === "object" && "sources" in output) {
      addSources((output as { sources: Source[] }).sources);
    }
  }, [output, addSources]);
  return (
    <Tool
      className="w-full"
      toolPart={{
        type: type.split("-")[1],
        state,
        input,
        output: output as Record<string, unknown> | undefined,
      }}
    />
  );
}
