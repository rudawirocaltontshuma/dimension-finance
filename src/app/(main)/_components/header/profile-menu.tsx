"use client";

import Link from "next/link";

import { CircleUser, LogOut, MessageSquareDot, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { demoProfile } from "@/data/profile";
import { getInitials } from "@/lib/utils";

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={demoProfile.avatar || undefined} alt={demoProfile.name} />
            <AvatarFallback>{getInitials(demoProfile.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-lg" side="bottom" align="end" sideOffset={8}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-9 rounded-full">
              <AvatarImage src={demoProfile.avatar || undefined} alt={demoProfile.name} />
              <AvatarFallback>{getInitials(demoProfile.name)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate font-medium">{demoProfile.name}</span>
              <span className="truncate text-muted-foreground text-xs">{demoProfile.role}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <CircleUser />
              Account settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <ShieldCheck />
              Access & permissions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/notifications">
              <MessageSquareDot />
              Notification preferences
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <LogOut />
          Log out (disabled in demo)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
