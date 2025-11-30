import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Login API Route
 * Initiates OAuth flow with Google
 */
export async function POST(request: NextRequest) {
  try {
    const { provider = "google" } = await request.json();
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as "google",
      options: {
        redirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message.includes("provider is not enabled")) {
        errorMessage = "Google OAuth provider is not enabled in Supabase. Please enable it in Supabase Dashboard > Authentication > Providers.";
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          code: error.status || 400,
          hint: error.message.includes("provider is not enabled") 
            ? "Go to Supabase Dashboard > Authentication > Providers > Google and enable it."
            : undefined
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
