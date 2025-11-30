"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Boxes, Bell, ArrowUpRight, Plus } from "lucide-react";
import { NavItem } from "./nav-item";
import { SidebarDrawer } from "./sidebar-drawer";
import { AuthButton } from "./auth-button";
import { Button } from "@/components/ui/button";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [hoveredSection, setHoveredSection] = React.useState<string | null>(
    null
  );
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  // Determine active section based on pathname
  React.useEffect(() => {
    if (pathname?.startsWith("/home")) {
      setActiveSection("home");
    } else if (pathname?.startsWith("/discover")) {
      setActiveSection("discover");
    } else if (pathname?.startsWith("/spaces")) {
      setActiveSection("spaces");
    } else {
      setActiveSection("home");
    }
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  // Sections that have drawer menus
  const sectionsWithDrawer = ["home", "discover"];

  const handleNavItemMouseEnter = (section: string) => {
    if (sectionsWithDrawer.includes(section)) {
      setHoveredSection(section);
    }
  };

  const handleNavItemMouseLeave = () => {
    setHoveredSection(null);
  };

  return (
    <>
      <aside className="relative flex h-screen w-20 flex-col items-center border-r border-border bg-background py-4">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <div className="h-6 w-6 rounded-full bg-foreground"></div>
          </div>
        </div>

        {/* Add Button */}
        <Button
          variant="ghost"
          size="icon"
          className="group mb-6 h-12 w-12 rounded-full border-2 border-dashed border-foreground/30 bg-popover transition-all duration-300 ease-out hover:border-foreground hover:bg-secondary hover:scale-110 hover:shadow-md"
        >
          <Plus className="h-5 w-5 text-foreground transition-transform duration-300 ease-out group-hover:rotate-90" />
        </Button>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col gap-2">
          <div
            onMouseEnter={() => handleNavItemMouseEnter("home")}
            onMouseLeave={handleNavItemMouseLeave}
          >
            <NavItem
              icon={Home}
              label="Home"
              href="/"
              isActive={isActive("/") || pathname?.startsWith("/home")}
            />
          </div>
          <div
            onMouseEnter={() => handleNavItemMouseEnter("discover")}
            onMouseLeave={handleNavItemMouseLeave}
          >
            <NavItem
              icon={Compass}
              label="Discover"
              href="/discover"
              isActive={pathname?.startsWith("/discover")}
            />
          </div>
          <NavItem
            icon={Boxes}
            label="Spaces"
            href="/spaces"
            isActive={pathname?.startsWith("/spaces")}
          />
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="group h-10 w-10 text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-secondary"
          >
            <Bell className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-12" />
          </Button>

          {/* Auth Button (Login/Logout) */}
          <AuthButton />

          <div className="flex flex-col items-center gap-1 group">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-secondary"
              title="Upgrade"
            >
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <span className="text-[10px] text-muted-foreground transition-colors duration-300 ease-out group-hover:text-foreground">
              Upgrade
            </span>
          </div>
        </div>
      </aside>

      {/* Drawer that appears on hover */}
      <SidebarDrawer
        section={hoveredSection}
        isVisible={!!hoveredSection}
        onMouseEnter={() => {
          // Keep drawer open when hovering over it
        }}
        onMouseLeave={handleNavItemMouseLeave}
      />
    </>
  );
};
