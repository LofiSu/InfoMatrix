"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pin,
  Briefcase,
  GraduationCap,
  Activity,
  Compass,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerSection {
  title: string;
  items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
  }>;
}

const drawerSections: Record<string, DrawerSection> = {
  home: {
    title: "Home",
    items: [
      { icon: Briefcase, label: "Travel", href: "/home/travel" },
      { icon: GraduationCap, label: "Academic", href: "/home/academic" },
      { icon: Activity, label: "Sports", href: "/home/sports" },
    ],
  },
  discover: {
    title: "Discover",
    items: [
      { icon: Compass, label: "For You", href: "/discover/for-you" },
      { icon: TrendingUp, label: "Top", href: "/discover/top" },
    ],
  },
};

export interface SidebarDrawerProps {
  section: string | null;
  isVisible: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  section,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();

  if (!section || !drawerSections[section]) {
    return null;
  }

  const drawerSection = drawerSections[section];
  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={cn(
        "fixed left-20 top-0 z-50 h-screen w-64 border-r border-border bg-background shadow-xl",
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "backdrop-blur-sm",
        isVisible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        willChange: "transform, opacity",
      }}
    >
      <div
        className={cn(
          "flex h-full flex-col p-4 transition-all duration-500 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2
            className={cn(
              "text-lg font-semibold transition-all duration-500 ease-out",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            )}
            style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
          >
            {drawerSection.title}
          </h2>
          <Pin
            className={cn(
              "h-4 w-4 text-muted-foreground transition-all duration-500 ease-out",
              isVisible
                ? "translate-x-0 opacity-100 rotate-0"
                : "translate-x-4 opacity-0 rotate-12"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          />
        </div>

        {/* Items */}
        <nav className="flex flex-col gap-1">
          {drawerSection.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-500 ease-out",
                  "hover:translate-x-1 hover:shadow-sm",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                )}
                style={{
                  transitionDelay: isVisible ? `${200 + index * 50}ms` : "0ms",
                }}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110" />
                <span className="transition-all duration-300 ease-out">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
