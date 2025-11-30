"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const LoginPrompt: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      // Show prompt if user is not logged in
      setIsVisible(!user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsVisible(!currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show user-friendly error message
        if (data.error?.includes("provider is not enabled")) {
          alert(
            "Google 登录未启用。\n\n" +
              "请在 Supabase Dashboard 中启用：\n" +
              "1. 进入 Authentication > Providers\n" +
              "2. 找到 Google provider\n" +
              "3. 启用开关并填写 Client ID 和 Secret\n" +
              "4. 点击 Save\n\n" +
              "详细步骤请查看：scripts/google-oauth-setup.md"
          );
        } else {
          alert(`登录失败：${data.error || "未知错误"}`);
        }
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("登录请求失败，请检查网络连接。");
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim()) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Email login error:", error);
        alert(error.message);
      } else {
        alert("Check your email for the login link!");
      }
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  if (loading || user || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="relative w-[380px] rounded-2xl border border-border bg-popover p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Logo */}
        <div className="mb-4 flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <div className="h-5 w-5 rounded-full bg-accent-foreground"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-1 text-xl font-semibold text-foreground">
          Sign in or create an account
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Unlock Pro Search and History
        </p>

        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          className="mb-3 w-full bg-foreground text-background hover:bg-foreground/90 h-11 text-base font-medium"
        >
          <svg
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Apple Login Button */}
        <Button
          variant="outline"
          className="mb-4 w-full border-border bg-background text-foreground hover:bg-secondary h-11 text-base font-medium"
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Continue with Apple
        </Button>

        {/* Email Input */}
        <div className="mb-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEmailLogin();
              }
            }}
          />
          <Button
            variant="outline"
            onClick={handleEmailLogin}
            disabled={!email.trim()}
            className="w-full border-border bg-background text-foreground hover:bg-secondary"
          >
            Continue with email
          </Button>
        </div>

        {/* SSO Link */}
        <button className="w-full pt-2 text-center text-sm text-foreground hover:underline">
          Single sign-on (SSO)
        </button>
      </div>
    </div>
  );
};
