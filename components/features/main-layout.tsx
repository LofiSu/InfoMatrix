"use client";

import * as React from "react";
import { useChat } from "ai/react";
import { Sidebar } from "./sidebar";
import { SearchBar } from "./search-bar";
import { ChatHistory } from "./chat-history";
import { ChatMessage } from "./chat-message";
import { LoginPrompt } from "./login-prompt";

export interface MainLayoutProps {
  children?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  searchPlaceholder,
  onSearch,
}) => {
  // Use Vercel AI SDK's useChat hook for streaming
  const {
    messages: aiMessages,
    append,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  // Convert AI SDK messages to our ChatMessage format
  const messages: ChatMessage[] = React.useMemo(() => {
    return aiMessages.map((msg, index) => ({
      id: msg.id || `msg-${index}`,
      role: msg.role as "user" | "assistant",
      content: msg.content,
      timestamp: new Date(msg.createdAt || Date.now()),
      isLoading:
        isLoading &&
        msg.role === "assistant" &&
        index === aiMessages.length - 1,
    }));
  }, [aiMessages, isLoading]);

  const handleSearch = React.useCallback(
    async (query: string) => {
      if (!query.trim() || isLoading) return;

      // Call external onSearch if provided
      onSearch?.(query);

      // Append the message to trigger streaming response
      await append({
        role: "user",
        content: query,
      });
    },
    [append, isLoading, onSearch]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Login Prompt - shows in bottom right when user is not logged in */}
        <LoginPrompt />
        {children ? (
          /* Children Content (for nested routes) */
          <div className="flex-1 overflow-auto border-t border-border">
            {children}
          </div>
        ) : hasMessages ? (
          /* Chat View - when messages exist */
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Chat History */}
            <ChatHistory messages={messages} className="flex-1" />

            {/* Search Bar at Bottom */}
            <div className="border-t border-border bg-background px-8 py-4">
              <SearchBar
                placeholder={searchPlaceholder}
                onSearch={handleSearch}
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full max-w-4xl mx-auto"
              />
              {error && (
                <div className="mt-2 text-sm text-destructive text-center">
                  Error: {error.message}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Initial View - when no messages */
          <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-12">
            {/* Logo/Brand */}
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-bold">
                <span className="text-foreground">Info</span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground ml-1">
                  Matrix
                </span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Serverless Multi-Agent Content Intelligence Platform
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              placeholder={searchPlaceholder}
              onSearch={handleSearch}
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            />
            {error && (
              <div className="mt-2 text-sm text-destructive text-center">
                Error: {error.message}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
