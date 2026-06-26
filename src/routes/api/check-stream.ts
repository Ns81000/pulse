import { createFileRoute } from "@tanstack/react-router";

type Status = "online" | "blocked" | "timeout" | "error";

async function check(url: string, referrer: string | null, ua: string | null): Promise<Status> {
  const headers: Record<string, string> = {
    "User-Agent": ua || "Mozilla/5.0 (compatible; PulseChecker/1.0)",
    Range: "bytes=0-1023",
  };
  if (referrer) headers["Referer"] = referrer;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 6000);
  try {
    // Many IPTV servers reject HEAD; use a ranged GET and abort after first chunk.
    const resp = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
      redirect: "follow",
    });
    if (resp.status === 403 || resp.status === 401 || resp.status === 451) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {
        // ignore
      }
      return "blocked";
    }
    if (!resp.ok && resp.status !== 206) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {
        // ignore
      }
      return "error";
    }

    const ct = (resp.headers.get("content-type") ?? "").toLowerCase();

    // 1. If it returns HTML, JSON, or XML (e.g. API responses, landing pages, or block pages), it is not a stream.
    if (
      ct.includes("text/html") ||
      ct.includes("application/json") ||
      ct.includes("text/xml") ||
      ct.includes("application/xml")
    ) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {
        // ignore
      }
      return "error";
    }

    // 2. Early return for standard stream content-types to avoid body-reading latency.
    const isStreamCT =
      ct.includes("mpegurl") ||
      ct.includes("video") ||
      ct.includes("audio") ||
      ct.includes("octet-stream") ||
      ct.includes("mp2t");

    if (isStreamCT) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {
        // ignore
      }
      return "online";
    }

    // 3. Fallback for ambiguous content-types: read first tiny chunk
    let text = "";
    const reader = resp.body?.getReader();
    if (reader) {
      try {
        const { value } = await reader.read();
        if (value) text = new TextDecoder().decode(value).slice(0, 512);
      } catch {
        // ignore
      } finally {
        try {
          await reader.cancel();
        } catch {
          // ignore
        }
      }
    }
    clearTimeout(t);

    const looksLikeStream =
      text.includes("#EXTM3U") ||
      ct.includes("mpegurl") ||
      ct.includes("video") ||
      ct.includes("octet-stream") ||
      ct.includes("mp2t");

    return looksLikeStream ? "online" : "error";
  } catch (e: unknown) {
    clearTimeout(t);
    if (e instanceof Error && e.name === "AbortError") return "timeout";
    return "error";
  }
}

export const Route = createFileRoute("/api/check-stream")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { url, referrer, user_agent } = (await request.json()) as {
            url: string;
            referrer?: string | null;
            user_agent?: string | null;
          };
          if (!url) {
            return new Response(JSON.stringify({ status: "error" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }
          const status = await check(url, referrer ?? null, user_agent ?? null);
          return new Response(JSON.stringify({ status }), {
            headers: { "content-type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ status: "error" }), {
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
