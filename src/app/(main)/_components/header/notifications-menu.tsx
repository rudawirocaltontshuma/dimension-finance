"use client";

import * as React from "react";

import Link from "next/link";

import { Banknote, Bell, Calendar, Landmark, Receipt, Settings, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { notifications as allNotifications } from "@/data/notifications";
import { cn } from "@/lib/utils";
import type { NotificationCategory } from "@/types/finance";

const categoryIcon: Record<NotificationCategory, React.ComponentType<{ className?: string }>> = {
  receivables: Banknote,
  payables: Receipt,
  banking: Landmark,
  budgeting: Target,
  close: Calendar,
  expenses: Receipt,
  system: Settings,
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

export function NotificationsMenu() {
  const [notifications, setNotifications] = React.useState(allNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Notifications" className="relative">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="font-medium text-sm">Notifications</span>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
          >
            Mark all as read
          </Button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = categoryIcon[notification.category];
            return (
              <Link
                key={notification.id}
                href={notification.href ?? "/dashboard"}
                className={cn(
                  "flex items-start gap-3 border-b px-4 py-3 text-sm last:border-b-0 hover:bg-accent",
                  !notification.read && "bg-accent/40",
                )}
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("leading-snug", !notification.read && "font-medium")}>{notification.title}</p>
                  <p className="mt-0.5 text-muted-foreground text-xs">{timeAgo(notification.timestamp)}</p>
                </div>
                {!notification.read && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
        <div className="border-t p-2">
          <Badge variant="outline" className="w-full justify-center py-1.5 text-muted-foreground text-xs">
            Demo notifications — no real alerts are sent
          </Badge>
        </div>
      </PopoverContent>
    </Popover>
  );
}
