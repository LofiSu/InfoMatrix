"use client";

import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  badge,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-md",
        isActive
          ? "bg-secondary text-foreground shadow-sm"
          : "text-foreground hover:bg-secondary/50"
      )}
    >
      <div className="relative transition-transform duration-300 ease-out group-hover:scale-110">
        <Icon className="h-5 w-5 transition-all duration-300 ease-out" />
        {badge && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground transition-transform duration-300 ease-out group-hover:scale-110">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs transition-all duration-300 ease-out">
        {label}
      </span>
    </Link>
  );
};
