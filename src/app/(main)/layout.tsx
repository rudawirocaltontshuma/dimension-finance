import type { ReactNode } from "react";

import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(main)/_components/sidebar/app-sidebar";
import { DemoModeBadge } from "@/components/demo-mode-badge";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getPreference } from "@/server/server-actions";
import { WorkspaceProvider } from "@/stores/workspace/workspace-context";

import { CommandMenu } from "./_components/header/command-menu";
import { CompanySelector } from "./_components/header/company-selector";
import { FiscalPeriodSelector } from "./_components/header/fiscal-period-selector";
import { LayoutControls } from "./_components/header/layout-controls";
import { NotificationsMenu } from "./_components/header/notifications-menu";
import { ProfileMenu } from "./_components/header/profile-menu";
import { ThemeSwitcher } from "./_components/header/theme-switcher";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const [variant, collapsible] = await Promise.all([
    getPreference("sidebar_variant"),
    getPreference("sidebar_collapsible"),
  ]);

  return (
    <WorkspaceProvider>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 68)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant={variant} collapsible={collapsible} />
        <SidebarInset
          className={cn(
            "[html[data-content-layout=centered]_&>*]:mx-auto",
            "[html[data-content-layout=centered]_&>*]:w-full",
            "[html[data-content-layout=centered]_&>*]:max-w-screen-2xl",
            "peer-data-[variant=inset]:border",
            "[--dashboard-header-height:--spacing(12)]",
            "min-w-0 overflow-x-clip",
          )}
        >
          <header
            className={cn(
              "flex h-auto min-h-12 shrink-0 flex-col border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:min-h-12",
              "[html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-50 [html[data-navbar-style=sticky]_&]:overflow-hidden [html[data-navbar-style=sticky]_&]:rounded-t-[inherit] [html[data-navbar-style=sticky]_&]:bg-background/50 [html[data-navbar-style=sticky]_&]:backdrop-blur-md",
            )}
          >
            <div className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-2 lg:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-1 lg:gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-1 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
                />
                <CompanySelector />
                <Separator
                  orientation="vertical"
                  className="mx-1 hidden data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center sm:block"
                />
                <div className="hidden sm:block">
                  <FiscalPeriodSelector />
                </div>
                <DemoModeBadge className="ml-1 hidden md:inline-flex" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CommandMenu />
                <NotificationsMenu />
                <LayoutControls />
                <ThemeSwitcher />
                <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
                <ProfileMenu />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 pb-2 sm:hidden">
              <FiscalPeriodSelector />
              <DemoModeBadge />
            </div>
          </header>
          {/* Pages can set data-content-padding="false" to render full-bleed app layouts. */}
          <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden p-4 has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  );
}
