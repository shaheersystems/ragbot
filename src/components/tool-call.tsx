import { Tool } from "@/components/ui/tool";

type ToolCallProps = {
  state:
    | "output-available"
    | "input-streaming"
    | "input-available"
    | "output-error";
  type: `tool-${string}`;
  input: Record<string, unknown>;
  output?: never;
};

export function ToolCall({ state, type, input, output }: ToolCallProps) {
  return (
    <Tool
      className="w-full"
      toolPart={{
        type: type.split("-")[1],
        state,
        input,
        output,
      }}
    />
  );
}
