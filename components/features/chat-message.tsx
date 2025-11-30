"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  message,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-4 px-4 py-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-3",
          isUser
            ? "bg-foreground text-background"
            : "bg-popover text-foreground border border-border"
        )}
      >
        <div className="whitespace-pre-wrap break-words text-sm">
          {message.content}
          {message.isLoading && message.content && (
            <span className="inline-block h-4 w-0.5 animate-pulse bg-current ml-1" />
          )}
        </div>
        {message.isLoading && !message.content && (
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
          </div>
        )}
        <div
          className={cn(
            "text-xs opacity-70",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
