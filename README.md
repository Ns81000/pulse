<p align="center">
  <img src="public/icons/icon-192.png" width="128" height="128" alt="Pulse Logo" />
</p>

<h1 align="center">P U L S E</h1>

<p align="center">
  <strong>FEEL EVERYTHING</strong>
</p>

<p align="center">
  A production-ready, custom-engineered IPTV streaming client built for absolute performance, verified stream viability, and a minimal obsidian-inspired design system.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-TanStack%20Start-red?style=for-the-badge&logo=react&logoColor=white&color=e5484d" alt="TanStack Start" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=0f1011" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Database-IndexedDB-blue?style=for-the-badge&logo=sqlite&logoColor=white&color=27a644" alt="IndexedDB" />
  <img src="https://img.shields.io/badge/Deployment-Vercel%20Ready-white?style=for-the-badge&logo=vercel&logoColor=black&color=ffffff" alt="Vercel Ready" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=open-source-initiative&logoColor=white&color=4385f4" alt="License" />
</p>

---

## Table of Contents

- [User Interface Layout](#user-interface-layout)
- [Complete Feature Catalog](#complete-feature-catalog)
- [Architectural Pipelines](#architectural-pipelines)
  - [1. Catalog Ingestion & Geographic Routing](#1-catalog-ingestion--geographic-routing)
  - [2. Stream Health Check Sequence](#2-stream-health-check-sequence)
- [Persistent Database Schema](#persistent-database-schema)
- [Design System & Color Swatches](#design-system--color-swatches)
- [Fluid Wave Mathematics](#fluid-wave-mathematics)
- [Local Development & Operations](#local-development--operations)
- [Deploying to Vercel](#deploying-to-vercel)
- [License](#license)

---

## User Interface Layout

The interface layout divides screen space dynamically between catalogs and player functions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  P U L S E  [Search channels...]                                    [ US ]  Favs  Browse │
├─────────────────────────────────────────┬──────────────────────────────────────────────┤
│ News    Sports    Movies   Entertainment│                                              │
├─────────────────────────────────────────┤                                              │
│ [Live] BBC News                         │             NATIVE HLS STREAMING             │
│   - United Kingdom                      │                 [ hls.js ]                   │
│                                         │                                              │
│ [Live] Sky Sports Premier League        │                                              │
│   - United Kingdom                      │                                              │
│                                         │                                              │
│ [Slow] Euronews                         │                                              │
│   - France                              │                                              │
│                                         │                                              │
│ [Off ] Movie Zone                       │      [||] Play   [M] Mute   [1080p]  [ [ ] ] │
│   - Germany                             ├──────────────────────┬───────────────────────┤
│                                         │ Favourites Toggler   │ Mini-Player Overlay   │
└─────────────────────────────────────────┴──────────────────────┴───────────────────────┘
```

---

## Complete Feature Catalog

Pulse contains dozens of specialized features designed for a premium, bulletproof streaming experience:

### 📺 Media & Playback Engine

- **Hybrid HLS Playback**: Adapts dynamically between the high-performance `hls.js` engine (configured with worker threads and custom HTTP Referer settings) and native iOS/Safari `.m3u8` player bindings.
- **Alternate Stream Failover**: If the primary stream encounters network or media errors, the player automatically iterates and falls back to alternate stream sources mapped to the channel.
- **Manual Quality Lock**: Decodes manifest levels to let users manual-lock specific resolutions (e.g. `1080p`, `720p`, `480p`) or toggle back to adaptive auto-bitrate algorithms.
- **Double-Tap Interaction**: Clicking or tapping the video area toggles play/pause state instantly, using double touch-guards to eliminate the standard mobile 300ms delay.
- **Fullscreen Orientation Lock**: On mobile devices, entering fullscreen mode automatically locks screen orientation to landscape utilizing the Screen Orientation API, returning to system-default upon exit.
- **Auto-Hide Controls Timer**: Controls fade out automatically after 2.5s of mouse/touch inactivity, restoring visibility instantly on coordinate movements.

### 🔍 Search & Filtering

- **Universal Omnibar Command Center**: Pressing <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> triggers a fuzzy search modal showcasing history, categories, countries, and live channels.
- **Intersecting Filter Pills**: Search queries can narrow down results using interactive pills (e.g., category: `News` + country: `Germany` + text: `Tagesschau`).
- **Debounced Search queries**: Restricts search processing with a `150ms` debouncing window, preventing DOM rendering bottlenecking on rapid keyboard inputs.
- **Dynamic Sidebar Filter Panels**: Fully responsive drawer panels on mobile and sidebar controls on desktop allow filtering by countries, category segments, and language tags.

### 🌐 Connectivity & Localization

- **GeoIP Locale Fallback**: Detects locale timezone codes and triggers a background payload to `ipapi.co/json` to determine the user's country and prioritize local feeds.
- **Network Status Listeners**: Attaches window-level listeners that watch `online` and `offline` states to automatically freeze polling queues and toast warnings if the connection drops.
- **Dynamic Sitemap compilation**: Serves a serverless sitemap route `/sitemap.xml` that updates indexes dynamically for search crawler optimization.

### ⚙️ Database & Offline Storage

- **IndexedDB Favourites Sync**: Relies on transaction-safe database stores for bookmarks, dispatching CustomEvents to update favorited cards across different routes.
- **History Trimming (Garbage Collection)**: Automatically caps the watched history index to a maximum of 200 records, sorting and deleting the oldest rows.
- **Stream Health Caching**: Cache health checks locally in IndexedDB to avoid repeating network validation checks on channels loaded into lists.

### 📱 Progressive Web App (PWA)

- **Adaptive Install Prompts**: Custom browser detectors show custom prompts for Android/Chrome installs or iOS manual Safari Share action instructions.
- **Standalone Display Layouts**: Implements responsive display adjustments specifically for PWA standalone containers, checking safe-area-insets dynamically.
- **Static Assets Caching Service Worker**: Pre-caches static shell endpoints (`/` and `/browse`) using a cache-first strategy in `sw.js`, bypassing caching only for dynamic API routes.

---

## Architectural Pipelines

Pulse relies on structured serverless routing to compile directories and verify media stream payloads without hitting client CORS or sandbox limitations.

### 1. Catalog Ingestion & Geographic Routing

The compiler pulls live listings in parallel, filters NSFW channels, translates country codes to emojis, and streams it back to the client-side TanStack Query cache.

```mermaid
graph TD
    %% Custom Styled Theme matching Pulse CSS variable system
    classDef default fill:#0f1011,stroke:#23252a,stroke-width:1px,color:#f7f8f8;
    classDef crimson fill:#e5484d,stroke:#34343a,stroke-width:2px,color:#ffffff;
    classDef green fill:#27a644,stroke:#1a1b1d,stroke-width:1px,color:#ffffff;
    classDef border fill:#141516,stroke:#e5484d,stroke-width:1px,color:#d0d6e0;

    A[Public IPTV Metadata]:::default -->|Parallel HTTP Fetches| B[Nitro Server Endpoint: /api/catalog]:::crimson
    B -->|Filter NSFW / Closed| C[Normalized Catalog & Countries]:::border
    C -->|Client Cache| D[TanStack Query Cache]:::default
    D -->|User Interaction| E[UI Components / Player]:::crimson

    E -->|Queue Background Checks| F[Client-side Queue Manager]:::default
    F -->|POST payload| G[Nitro Server Endpoint: /api/check-stream]:::crimson
    G -->|Ranged GET bytes=0-1023| H[Remote IPTV Stream Server]:::default
    H -->|First Byte Chunk & Headers| G
    G -->|Validate Stream Payload| I{Health Evaluation}:::border
    I -->|Online| J[IndexedDB Storage: stream_health]:::green
    I -->|Blocked / Timeout / Error| K[IndexedDB Storage: stream_health]:::border
```

---

### 2. Stream Health Check Sequence

Many IPTV servers block standard HEAD checking. Pulse invokes ranged GET operations, parsing headers and cancelling body retrieval after the first chunk.

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client App
    participant API as Nitro Server (/api/check-stream)
    participant Host as IPTV Stream Host

    Client->>Client: Queue Channel Health Check
    Client->>API: POST { url, referrer, user_agent }
    Note over API: Initialize AbortController<br/>Timeout set to 6 seconds
    API->>Host: GET Request (Range: bytes=0-1023)
    Host-->>API: Stream Data / Headers
    Note over API: Inspect Content-Type<br/>Cancel stream body read immediately
    alt Status 200/206 & video/audio CT
        API-->>Client: Response: "online"
    else Status 403/401/451
        API-->>Client: Response: "blocked"
    else AbortError / Timeout
        API-->>Client: Response: "timeout"
    else Non-media CT (HTML/JSON/XML) or network failure
        API-->>Client: Response: "error"
    End
```

---

## Persistent Database Schema

Pulse offloads core client state to **IndexedDB** (`iptv-local`), guaranteeing clean, non-blocking storage transactions.

```mermaid
erDiagram
    "iptv-local" ||--o{ "favourites" : stores
    "iptv-local" ||--o{ "history" : logs
    "iptv-local" ||--o{ "preferences" : records
    "iptv-local" ||--o{ "stream_health" : caches

    "favourites" {
        string channelId PK "ID of the channel"
        string added_at "Timestamp of bookmark"
    }
    "history" {
        string watched_at PK "Timestamp of play event"
        string channelId FK "Reference to channel"
        number duration_ms "Watch duration"
    }
    "preferences" {
        string key PK "Setting configuration name"
        any value "Target value payload"
    }
    "stream_health" {
        string channelId PK "ID of the channel"
        string status "online | blocked | timeout | error"
        string checked_at "Verification timestamp"
        number workingIndex "Alternate source pointer index"
    }
```

---

## Core Capabilities Matrix

| Area       | Feature               | Description                                                  | Status |
| :--------- | :-------------------- | :----------------------------------------------------------- | :----- |
| **Media**  | Native HLS & `hls.js` | Dual fallback streaming engine with volume caching           | Ready  |
| **PWA**    | Cache-first `sw.js`   | Service worker handles offline static caching of page routes | Ready  |
| **State**  | Favourites Hooks      | Event-driven React hooks that sync browser IndexedDB changes | Ready  |
| **Search** | Keyboard Omnibar      | Global command palette triggered by shortcuts                | Ready  |
| **GeoIP**  | Country Sorting       | Locale defaults fallback to ipapi.co to float local channels | Ready  |

---

## Design System & Color Swatches

Pulse utilizes a dark-mode first canvas featuring deep surfaces and vibrant status accents. These swatches represent the exact hexadecimal targets in `styles.css`.

| Variable           | Visual Swatch                                                                                       | Semantic Target          | HSL Mapping          |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :----------------------- | :------------------- |
| `--surface-base`   | <img src="https://img.shields.io/badge/%23010102-base-010102?style=flat-square" alt="#010102" />    | Root Canvas Background   | `hsl(240, 10%, 1%)`  |
| `--surface-1`      | <img src="https://img.shields.io/badge/%230f1011-surface-0f1011?style=flat-square" alt="#0f1011" /> | Primary Panels & Shelves | `hsl(210, 8%, 6%)`   |
| `--border-default` | <img src="https://img.shields.io/badge/%2323252a-border-23252a?style=flat-square" alt="#23252a" />  | Element Boundaries       | `hsl(225, 10%, 15%)` |
| `--accent`         | <img src="https://img.shields.io/badge/%23e5484d-accent-e5484d?style=flat-square" alt="#e5484d" />  | Crimson Red Action Items | `hsl(358, 76%, 59%)` |
| `--status-online`  | <img src="https://img.shields.io/badge/%2327a644-online-27a644?style=flat-square" alt="#27a644" />  | Live & Verified Streams  | `hsl(134, 62%, 41%)` |
| `--status-blocked` | <img src="https://img.shields.io/badge/%23ff6161-blocked-ff6161?style=flat-square" alt="#ff6161" /> | Restricted Geo-Zones     | `hsl(0, 100%, 69%)`  |

---

## Fluid Wave Mathematics

The canvas-based entrance gateway (`ImmersiveLanding.tsx`) renders animated waveforms using high-performance mathematical equations:

$$y = \text{baseHeight} - \sin(x \cdot \text{frequency} + \text{phase}) \cdot \text{amplitude}$$

- **Phase Accumulators**: Individual timers mutate wave coordinates (`phase1`, `phase2`, `phase3`) at variable speeds.
- **Cursor Influence**: Captures coordinate delta $d = |x - x_{\text{cursor}}|$. If $d < 320$, amplitude scales by a localized factor:
  $$\text{amplitude}_{\text{active}} = \text{amplitude} + \left(1 - \frac{d}{320}\right) \cdot 16 \cdot \sin(\text{phase} \cdot 1.2)$$

---

## Local Development & Operations

### Prerequisites

- Node.js runtime environment (version `>=20.0.0`)
- `pnpm` Package Manager

### Installation & Launch

```bash
# Install package dependencies
pnpm install

# Run the local Vite dev server
pnpm run dev
```

### Static Quality Verification

```bash
# Format code structure using Prettier
pnpm run format

# Audit codebase lint rules
pnpm run lint
```

---

## Deploying to Vercel

Pulse is fully pre-configured to build on Vercel.

> [!TIP]
> **Vercel Settings**:
>
> 1. Set the **Framework Preset** to **Other** (or let Vercel auto-detect the Vite build).
> 2. Ensure the build command is set to `pnpm run build`.
> 3. Verify the output directory is set to `.vercel/output`.
> 4. Ensure you use Node.js version `20.x` or higher in your project settings.

---

## Tribute & Acknowledgement

Pulse is made possible by the dedicated contributions of the open-source IPTV database communities. We extend our gratitude and tribute to:

- **The IPTV-Org Project**: For compiling and maintaining the comprehensive database of public television broadcasts, logos, and streams worldwide.
- **Open-Source Stream Curators**: The community of maintainers and contributors who ensure public broadcasts remain accessible to all.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
