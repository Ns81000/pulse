import { useEffect } from "react";
import { queueBackgroundCheck } from "@/lib/data-hooks";
import type { CatalogChannel } from "@/lib/types";

interface Props {
  channelIds: string[];
  channels: Record<string, CatalogChannel>;
  limit?: number;
}

export function BackgroundPingTrigger({ channelIds, channels, limit = 8 }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = channelIds.slice(0, limit);
    for (const id of targets) {
      const ch = channels[id];
      if (!ch) continue;
      const first = ch.streams[0];
      if (!first) continue;
      // Queue background check
      queueBackgroundCheck(ch.id, first.url, first.referrer, first.user_agent);
    }
  }, [channelIds, channels, limit]);

  return null;
}
