"use client";

import * as React from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const AuthButton: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10" disabled>
        <User className="h-5 w-5" />
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 p-0 transition-all duration-300 ease-out hover:scale-110"
            onClick={handleLogout}
            title="Logout"
          >
            <Avatar className="h-8 w-8 border-2 border-background transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-accent/20">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.email || "User"}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </Avatar>
          </Button>
        </div>
        <span className="text-[10px] text-muted-foreground transition-colors duration-300 ease-out">
          {user.email?.split("@")[0] || "Account"}
        </span>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-secondary"
      onClick={handleLogin}
      title="Login with Google"
    >
      <LogIn className="h-5 w-5" />
    </Button>
  );
};
