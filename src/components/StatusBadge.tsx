import type { ChannelStatus } from "@/lib/types";

interface Props { status: ChannelStatus; size?: "sm" | "md" }

export function StatusBadge({ status, size = "sm" }: Props) {
  if (status === "idle" || status === "recovering") return null;
  const map: Record<Exclude<ChannelStatus, "idle" | "recovering">, { cls: string; label: string; dot: boolean }> = {
    checking: { cls: "badge--checking", label: "Checking", dot: true },
    online:   { cls: "badge--live", label: "Live", dot: true },
    blocked:  { cls: "badge--blocked", label: "Blocked", dot: false },
    timeout:  { cls: "badge--slow", label: "Slow", dot: false },
    error:    { cls: "badge--off", label: "Offline", dot: false },
  };
  const v = map[status as keyof typeof map];
  return (
    <span className={`badge ${v.cls}`} style={size === "md" ? { padding: "5px 10px", fontSize: 11 } : undefined}>
      {v.dot && <span className="dot" />}
      {v.label}
    </span>
  );
}
