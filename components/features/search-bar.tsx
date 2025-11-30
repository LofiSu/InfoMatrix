"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Ask anything. Type @ for mentions and / for shortcuts.",
  onSearch,
  className,
  value: controlledValue,
  disabled = false,
  isLoading = false,
}) => {
  const [query, setQuery] = React.useState(controlledValue || "");
  const [isFocused, setIsFocused] = React.useState(false);

  // Sync with controlled value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setQuery(controlledValue);
    }
  }, [controlledValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch && !disabled && !isLoading) {
      const message = query.trim();
      onSearch(message);
      // Clear input after sending (if not controlled)
      if (controlledValue === undefined) {
        setQuery("");
      }
    }
  };

  const handleSendClick = () => {
    if (query.trim() && onSearch && !disabled && !isLoading) {
      const message = query.trim();
      onSearch(message);
      // Clear input after sending (if not controlled)
      if (controlledValue === undefined) {
        setQuery("");
      }
    }
  };

  return (
    <div className={cn("relative w-full max-w-3xl", className)}>
      {/* Main Input Container */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex flex-col rounded-2xl border border-border bg-popover shadow-sm transition-all"
        )}
      >
        {/* Input Field - Takes up most of the space */}
        <div className="flex items-center px-4 pt-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => {
              const newValue = e.target.value;
              setQuery(newValue);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
        </div>

        {/* Bottom Section with Icons */}
        <div className="flex items-center justify-end gap-2 px-4 pb-3 pt-2">
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground hover:bg-background"
            title="Attach"
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          {/* Send Button */}
          <Button
            type="submit"
            variant={query.trim() ? "default" : "ghost"}
            size="icon"
            className={cn(
              "h-8 w-8",
              query.trim()
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "text-foreground hover:bg-background"
            )}
            title="Send"
            disabled={disabled || isLoading || !query.trim()}
            onClick={handleSendClick}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
