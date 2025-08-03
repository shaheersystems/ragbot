"use client";

import AiMessage from "@/components/ai-message";
import { ChatInput } from "@/components/chat-input";
import { ToolCall } from "@/components/tool-call";
import { Button } from "@/components/ui/button";
import { AISource } from "@/components/ui/kibo-ui/ai/source";
import UserMessage from "@/components/user-message";
import { sourcesStore } from "@/store";
import { useChat } from "@ai-sdk/react";
import { useStore } from "exome/react";
import { useState } from "react";
const suggestions = [
  "How does similarity search work with a Vector DB?",
  "What is DataStax Enterprise?",
  "How does CassIO work?",
  "What are some common FAQs about Astra?",
];
export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat();
  const handleSubmit = async () => {
    if (status === "streaming" || status === "submitted") {
      await stop();
      return;
    }
    if (input.trim() === "") {
      return;
    }
    const newMessage = input;
    setInput("");
    await sendMessage({ text: newMessage });
  };
  const { sources } = useStore(sourcesStore);
  return (
    <div className="flex flex-col w-full max-w-4xl h-screen py-12 mx-auto">
      {messages.length > 0 ? (
        <div className="h-[70vh] overflow-y-auto no-scrollbar">
          {messages.map((m) => (
            <>
              <div
                key={m.id}
                className="flex flex-col gap-8 whitespace-pre-wrap"
              >
                <div>
                  {m.parts.map((part, idx) => {
                    switch (part.type) {
                      case "text":
                        if (m.role === "user") {
                          return <UserMessage key={idx} content={part.text} />;
                        } else {
                          return <AiMessage content={part.text} />;
                        }
                      case "tool-search_documentation":
                        return (
                          <div className="py-4">
                            <ToolCall
                              type={part.type}
                              state={part.state}
                              input={part.input as Record<string, unknown>}
                              output={part.output}
                            />
                          </div>
                        );
                    }
                  })}
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="space-y-12 text-center">
            <h2 className="text-4xl font-inter">Datastax AI</h2>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {suggestions.map((value, idx) => {
                return (
                  <Button
                    onClick={() => {
                      setInput(value);
                    }}
                    variant={"secondary"}
                    className="cursor-pointer"
                    size={"sm"}
                    key={idx}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* <div className="py-4">
        {sources &&
          sources?.map((s) => {
            return (
              <div key={s?.url}>
                <AISource href={s?.url} title={s?.title} />
              </div>
            );
          })}
      </div> */}
      <div className="fixed bottom-6 max-w-4xl w-full">
        <ChatInput
          setInput={setInput}
          input={input}
          handleSubmit={handleSubmit}
          status={status}
        />
      </div>
    </div>
  );
}
