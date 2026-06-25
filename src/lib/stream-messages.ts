/** Single source of truth for stream check result messages */
export const STREAM_MSG = {
  blocked: "Geo-blocked from this region",
  timeout: "Stream is slow to respond",
  error: "Stream is offline right now",
  unknown: "Couldn't reach this channel",
} as const;

export function streamErrorMsg(status: string): string {
  return STREAM_MSG[status as keyof typeof STREAM_MSG] ?? STREAM_MSG.unknown;
}
