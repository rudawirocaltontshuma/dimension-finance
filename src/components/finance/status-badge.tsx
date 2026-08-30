import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusMeta {
  dot: string;
  badge: string;
}

export function StatusBadge({ status, meta, className }: { status: string; meta: StatusMeta; className?: string }) {
  return (
    <Badge variant="outline" className={cn("gap-1.5 whitespace-nowrap px-2 py-1 font-medium", meta.badge, className)}>
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {status}
    </Badge>
  );
}
