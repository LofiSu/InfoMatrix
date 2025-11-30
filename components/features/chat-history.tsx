"use client";

import * as React from "react";
import { ChatMessage, ChatMessageComponent } from "./chat-message";

export interface ChatHistoryProps {
  messages: ChatMessage[];
  className?: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  className,
}) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-1 flex-col overflow-y-auto ${className || ""}`}>
      <div className="flex flex-col">
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
