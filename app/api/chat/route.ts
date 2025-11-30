import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

/**
 * Chat API Route with Streaming Support
 * 
 * Uses Vercel AI SDK to stream responses from OpenAI.
 * This implements the streaming response pattern for real-time LLM output.
 */
export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      return new Response(
        JSON.stringify({ error: "Last message must be from user" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response using Vercel AI SDK
    const result = await streamText({
      model: openai("gpt-4o-mini"), // Using gpt-4o-mini for cost efficiency, can be changed to gpt-4o
      messages: messages.map((msg: any) => {
        // Ensure content is properly formatted as a string and handle Unicode
        let content = typeof msg.content === "string" 
          ? msg.content 
          : String(msg.content || "");
        
        // Normalize the content to handle Unicode properly
        if (content) {
          content = content.normalize("NFC");
        }
        
        return {
          role: msg.role,
          content: content,
        };
      }),
      maxTokens: 2000,
      temperature: 0.7,
    });

    // Return the streaming response
    // toDataStreamResponse should handle UTF-8, but ensure proper encoding
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}
