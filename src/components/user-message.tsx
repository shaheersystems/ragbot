"use client";

import { Message, MessageContent } from "@/components/ui/message";
type UserMessageProps = {
  content: string;
};
const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <Message className="justify-end">
      <MessageContent className="text-sm">{content}</MessageContent>
    </Message>
  );
};

export default UserMessage;
