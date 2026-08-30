import { CheckCircle2 } from "lucide-react";

import { formatDate } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  label: string;
  actor: string;
  date: string;
  note?: string;
}

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
          {index < items.length - 1 && <span className="absolute top-5 left-[9px] h-full w-px bg-border" />}
          <span
            className={cn(
              "z-10 mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground",
            )}
          >
            <CheckCircle2 className="size-3" />
          </span>
          <div className="min-w-0 flex-1 pt-px">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="font-medium text-sm">{item.label}</p>
              <span className="text-muted-foreground text-xs">{formatDate(item.date)}</span>
            </div>
            <p className="text-muted-foreground text-xs">by {item.actor}</p>
            {item.note && <p className="mt-1 text-sm">{item.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
