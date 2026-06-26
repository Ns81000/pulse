import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as isFavourite, d as removeFavourite, g as usePlayer, i as getWorkingStreamIndex, l as recordHealth, m as useCatalog, n as addFavourite, p as streamErrorMsg, r as checkStream, u as recordHistory } from "./stream-messages-Bqm6fwz2.mjs";
import { f as Link, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-DMMrUB_V.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Maximize2, a as Tv, b as ExternalLink, d as RotateCcw, f as Play, g as Minimize2, i as Volume2, k as ArrowLeft, l as Settings, m as Pause, p as PictureInPicture2, r as VolumeX, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Route } from "./watch._channelId-C-L9Wpi_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._channelId-Dv_u6LNQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Player({ channel, onFatalError, compact }) {
	const containerRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const hlsRef = (0, import_react.useRef)(null);
	const hideTimer = (0, import_react.useRef)(null);
	const clickTimer = (0, import_react.useRef)(null);
	const player = usePlayer();
	const [activeStreamIdx, setActiveStreamIdx] = (0, import_react.useState)(player.workingStreamIndex);
	const [loadState, setLoadState] = (0, import_react.useState)("connecting");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [volume, setVolume] = (0, import_react.useState)(1);
	const [fullscreen, setFullscreen] = (0, import_react.useState)(false);
	const [pip, setPip] = (0, import_react.useState)(false);
	const [showVolumeSlider, setShowVolumeSlider] = (0, import_react.useState)(false);
	const [showSettings, setShowSettings] = (0, import_react.useState)(false);
	const [levels, setLevels] = (0, import_react.useState)([]);
	const [currentLevel, setCurrentLevel] = (0, import_react.useState)(-1);
	const [controlsVisible, setControlsVisible] = (0, import_react.useState)(true);
	const volumeRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setActiveStreamIdx(player.workingStreamIndex);
	}, [player.workingStreamIndex]);
	const tryNextStream = (0, import_react.useCallback)(() => {
		if (activeStreamIdx < channel.streams.length - 1) {
			console.warn(`Stream ${activeStreamIdx} of channel ${channel.name} failed, trying fallback stream ${activeStreamIdx + 1}`);
			setLoadState("connecting");
			setActiveStreamIdx((prev) => prev + 1);
			return true;
		}
		return false;
	}, [
		activeStreamIdx,
		channel.streams.length,
		channel.name
	]);
	(0, import_react.useEffect)(() => {
		if (!containerRef.current || !player.videoEl) return;
		player.mountInto(containerRef.current);
		return () => {
			player.mountInto(null);
		};
	}, [channel.id, player.videoEl]);
	(0, import_react.useEffect)(() => {
		const v = player.videoEl;
		if (!v) return;
		const stream = channel.streams[activeStreamIdx] || channel.streams[0];
		if (!stream) return;
		setLoadState("connecting");
		let destroyed = false;
		const attemptPlay = () => {
			v.play().catch((err) => {
				console.warn("Playback blocked, attempting muted autoplay:", err);
				v.muted = true;
				v.play().catch((err2) => {
					console.error("Muted playback also blocked:", err2);
				});
			});
		};
		(async () => {
			if (hlsRef.current) {
				try {
					hlsRef.current.destroy();
				} catch {}
				hlsRef.current = null;
			}
			const HlsMod = (await import("../_libs/hls.js.mjs").then((n) => n.t)).default;
			if (HlsMod.isSupported()) {
				const hls = new HlsMod({
					enableWorker: true,
					lowLatencyMode: false,
					maxBufferLength: 30,
					xhrSetup: (xhr) => {
						try {
							if (stream.referrer) xhr.setRequestHeader("Referer", stream.referrer);
						} catch {}
					}
				});
				hlsRef.current = hls;
				hls.loadSource(stream.url);
				hls.attachMedia(v);
				hls.on(HlsMod.Events.MANIFEST_PARSED, () => {
					if (destroyed) return;
					setLevels(hls.levels.map((l, i) => ({
						index: i,
						height: l.height,
						bitrate: l.bitrate
					})));
					setCurrentLevel(hls.currentLevel);
					attemptPlay();
				});
				hls.on(HlsMod.Events.LEVEL_SWITCHED, (_e, data) => setCurrentLevel(data.level));
				hls.on(HlsMod.Events.ERROR, (_e, data) => {
					if (!data.fatal) return;
					if (data.type === HlsMod.ErrorTypes.MEDIA_ERROR) try {
						hls.recoverMediaError();
						return;
					} catch {}
					if (data.type === HlsMod.ErrorTypes.NETWORK_ERROR) try {
						hls.startLoad();
						return;
					} catch {}
					if (tryNextStream()) return;
					setLoadState("error");
					onFatalError?.();
				});
			} else if (v.canPlayType("application/vnd.apple.mpegurl")) {
				v.src = stream.url;
				attemptPlay();
			} else {
				if (tryNextStream()) return;
				setLoadState("error");
				onFatalError?.();
			}
		})();
		return () => {
			destroyed = true;
			if (hlsRef.current) {
				try {
					hlsRef.current.destroy();
				} catch {}
				hlsRef.current = null;
			}
		};
	}, [
		channel.id,
		player.videoEl,
		activeStreamIdx,
		tryNextStream
	]);
	(0, import_react.useEffect)(() => {
		const v = player.videoEl;
		if (!v) return;
		const onPlay = () => {
			setPlaying(true);
			setLoadState("ready");
			if (activeStreamIdx !== player.workingStreamIndex) recordHealth(channel.id, "online", activeStreamIdx).catch(() => {});
		};
		const onPause = () => setPlaying(false);
		const onWaiting = () => setLoadState((s) => s === "ready" ? "buffering" : s);
		const onPlaying = () => setLoadState("ready");
		const onErr = () => {
			if (tryNextStream()) return;
			setLoadState("error");
			onFatalError?.();
		};
		const onVol = () => {
			setMuted(v.muted);
			setVolume(v.volume);
		};
		const onEnterPip = () => setPip(true);
		const onLeavePip = () => setPip(false);
		v.addEventListener("play", onPlay);
		v.addEventListener("pause", onPause);
		v.addEventListener("waiting", onWaiting);
		v.addEventListener("playing", onPlaying);
		v.addEventListener("error", onErr);
		v.addEventListener("volumechange", onVol);
		v.addEventListener("enterpictureinpicture", onEnterPip);
		v.addEventListener("leavepictureinpicture", onLeavePip);
		setPlaying(!v.paused);
		setMuted(v.muted);
		setVolume(v.volume);
		return () => {
			v.removeEventListener("play", onPlay);
			v.removeEventListener("pause", onPause);
			v.removeEventListener("waiting", onWaiting);
			v.removeEventListener("playing", onPlaying);
			v.removeEventListener("error", onErr);
			v.removeEventListener("volumechange", onVol);
			v.removeEventListener("enterpictureinpicture", onEnterPip);
			v.removeEventListener("leavepictureinpicture", onLeavePip);
		};
	}, [
		player.videoEl,
		onFatalError,
		activeStreamIdx,
		player.workingStreamIndex,
		channel.id,
		tryNextStream
	]);
	(0, import_react.useEffect)(() => {
		const onFs = () => {
			const isFs = Boolean(document.fullscreenElement);
			setFullscreen(isFs);
			if (!isFs) try {
				screen.orientation.unlock();
			} catch {}
		};
		document.addEventListener("fullscreenchange", onFs);
		return () => document.removeEventListener("fullscreenchange", onFs);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!showVolumeSlider) return;
		const handler = (e) => {
			if (volumeRef.current && !volumeRef.current.contains(e.target)) setShowVolumeSlider(false);
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [showVolumeSlider]);
	const armHide = (0, import_react.useCallback)(() => {
		setControlsVisible(true);
		if (hideTimer.current) clearTimeout(hideTimer.current);
		hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
	}, []);
	(0, import_react.useEffect)(() => {
		armHide();
		return () => {
			if (hideTimer.current) clearTimeout(hideTimer.current);
		};
	}, [armHide]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (clickTimer.current) clearTimeout(clickTimer.current);
		};
	}, []);
	const togglePlay = (0, import_react.useCallback)(() => {
		const v = player.videoEl;
		if (!v) return;
		if (v.paused) v.play().catch(() => {});
		else v.pause();
	}, [player.videoEl]);
	const toggleMute = (0, import_react.useCallback)(() => {
		const v = player.videoEl;
		if (!v) return;
		v.muted = !v.muted;
	}, [player.videoEl]);
	const onVolume = (0, import_react.useCallback)((val) => {
		const v = player.videoEl;
		if (!v) return;
		v.volume = val;
		v.muted = val === 0;
	}, [player.videoEl]);
	const toggleFs = (0, import_react.useCallback)(async () => {
		const el = wrapRef.current;
		if (!el) return;
		try {
			if (document.fullscreenElement) {
				await document.exitFullscreen();
				try {
					screen.orientation.unlock();
				} catch {}
			} else {
				await el.requestFullscreen();
				try {
					await screen.orientation.lock("landscape");
				} catch {}
			}
		} catch {}
	}, []);
	const togglePip = (0, import_react.useCallback)(async () => {
		const v = player.videoEl;
		if (!v) return;
		try {
			if (document.pictureInPictureElement) await document.exitPictureInPicture();
			else await v.requestPictureInPicture();
		} catch {}
	}, [player.videoEl]);
	const reload = (0, import_react.useCallback)(() => {
		const v = player.videoEl;
		if (!v) return;
		setLoadState("connecting");
		try {
			if (hlsRef.current) hlsRef.current.startLoad();
			v.play().catch(() => {});
		} catch {}
	}, [player.videoEl]);
	const didTouchRef = (0, import_react.useRef)(false);
	const handleVideoClick = (0, import_react.useCallback)(() => {
		if (didTouchRef.current) {
			didTouchRef.current = false;
			return;
		}
		armHide();
		if (clickTimer.current) clearTimeout(clickTimer.current);
		clickTimer.current = setTimeout(() => {
			togglePlay();
		}, 150);
	}, [armHide, togglePlay]);
	const handleVideoTouch = (0, import_react.useCallback)(() => {
		didTouchRef.current = true;
		armHide();
		if (clickTimer.current) clearTimeout(clickTimer.current);
		clickTimer.current = setTimeout(() => {
			togglePlay();
		}, 150);
	}, [armHide, togglePlay]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			if (e.code === "Space") {
				e.preventDefault();
				togglePlay();
			} else if (e.key === "f" || e.key === "F") toggleFs();
			else if (e.key === "m" || e.key === "M") toggleMute();
			else if (e.key === "p" || e.key === "P") togglePip();
			else if (e.key === "ArrowUp") {
				e.preventDefault();
				onVolume(Math.min(1, volume + .1));
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				onVolume(Math.max(0, volume - .1));
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		togglePlay,
		toggleFs,
		toggleMute,
		togglePip,
		volume
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: `player-wrap ${controlsVisible ? "controls-visible" : ""} ${compact ? "rounded-lg" : "rounded-xl"} overflow-hidden`,
		onMouseMove: armHide,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "aspect-video w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": playing ? "Pause" : "Play",
				onClick: handleVideoClick,
				onTouchEnd: (e) => {
					e.preventDefault();
					handleVideoTouch();
				},
				className: "absolute inset-0 z-[15] h-full w-full bg-transparent",
				style: {
					WebkitTapHighlightColor: "transparent",
					cursor: "default"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-3 top-3 z-[20] flex items-center gap-2",
				children: [
					loadState === "connecting" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge badge--checking",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }), " Connecting"]
					}),
					loadState === "buffering" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge badge--checking",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }), " Buffering"]
					}),
					loadState === "ready" && playing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge badge--live",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }), " Live"]
					})
				]
			}),
			!playing && loadState !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Play",
				onClick: (e) => {
					e.stopPropagation();
					if (clickTimer.current) clearTimeout(clickTimer.current);
					togglePlay();
				},
				onTouchEnd: (e) => {
					e.preventDefault();
					e.stopPropagation();
					if (clickTimer.current) clearTimeout(clickTimer.current);
					togglePlay();
				},
				className: "absolute inset-x-0 top-0 bottom-[60px] z-[25] grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ctrl-btn ctrl-btn--lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						className: "size-7 translate-x-0.5",
						fill: "currentColor"
					})
				})
			}),
			loadState === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[25] grid place-items-center bg-black/80 text-center text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-white/80",
						children: "This stream isn't responding."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: reload,
						className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[12px] font-medium text-black hover:bg-white/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Try again"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "player-controls",
				style: { zIndex: 20 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 px-3 pb-3 sm:gap-2 sm:px-4 sm:pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": playing ? "Pause" : "Play",
							onClick: togglePlay,
							className: "ctrl-btn",
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
								className: "size-4",
								fill: "currentColor"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								className: "size-4 translate-x-0.5",
								fill: "currentColor"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: volumeRef,
							className: "group relative flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": muted ? "Unmute" : "Mute",
								onClick: () => {
									if (window.matchMedia("(hover: none)").matches) setShowVolumeSlider((s) => !s);
									else toggleMute();
								},
								className: "ctrl-btn",
								children: muted || volume === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .05,
								value: muted ? 0 : volume,
								onChange: (e) => onVolume(Number(e.target.value)),
								className: "vol-slider hidden group-hover:block sm:group-hover:block",
								style: { display: showVolumeSlider ? "block" : void 0 },
								"aria-label": "Volume"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 sm:gap-2",
							children: [
								levels.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "Quality",
										onClick: () => setShowSettings((s) => !s),
										className: "ctrl-btn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
									}), showSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute bottom-[44px] right-0 min-w-[140px] overflow-hidden rounded-lg border border-white/10 bg-black/90 p-1 backdrop-blur",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (hlsRef.current) hlsRef.current.currentLevel = -1;
												setShowSettings(false);
											},
											className: `block w-full rounded-md px-3 py-1.5 text-left text-[12px] text-white hover:bg-white/10 ${currentLevel === -1 ? "bg-white/10" : ""}`,
											children: "Auto"
										}), levels.slice().reverse().map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (hlsRef.current) hlsRef.current.currentLevel = l.index;
												setShowSettings(false);
											},
											className: `block w-full rounded-md px-3 py-1.5 text-left text-[12px] text-white hover:bg-white/10 ${currentLevel === l.index ? "bg-white/10" : ""}`,
											children: l.height ? `${l.height}p` : `${Math.round(l.bitrate / 1e3)}k`
										}, l.index))]
									})]
								}),
								typeof document !== "undefined" && "pictureInPictureEnabled" in document && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Picture in picture",
									onClick: togglePip,
									className: "ctrl-btn",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureInPicture2, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": fullscreen ? "Exit fullscreen" : "Fullscreen",
									onClick: toggleFs,
									className: "ctrl-btn",
									children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
								})
							]
						})
					]
				})]
			})
		]
	});
}
var CODE_MAP = {
	uk: "gb",
	int: ""
};
function toFlagCode(code) {
	const lower = code.toLowerCase();
	return CODE_MAP[lower] ?? lower;
}
function WatchPage() {
	const { channelId } = Route.useParams();
	const navigate = useNavigate();
	const cat = useCatalog();
	const { open, close } = usePlayer();
	const [status, setStatus] = (0, import_react.useState)("checking");
	const [fav, setFav] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		return () => {
			close();
		};
	}, [close]);
	const channel = cat.data?.channels[channelId];
	const flagCode = (0, import_react.useMemo)(() => {
		if (!channel) return "";
		return channel.country ? toFlagCode(channel.country) : "";
	}, [channel]);
	const catNames = (0, import_react.useMemo)(() => {
		if (!cat.data || !channel) return [];
		return channel.categories.map((id) => cat.data.meta.categories.find((c) => c.id === id)?.name ?? id);
	}, [cat.data, channel]);
	const runCheck = (0, import_react.useCallback)(async (force = false) => {
		if (!channel) return;
		setStatus("checking");
		const cachedIndex = getWorkingStreamIndex(channel.id);
		let statusResult = "error";
		let workingIndex = cachedIndex;
		const tryStream = async (idx) => {
			const s = channel.streams[idx];
			if (!s) return "error";
			if (typeof window !== "undefined" && window.location.protocol === "https:" && s.url.startsWith("http://")) return "blocked";
			return await checkStream(s.url, s.referrer, s.user_agent, force);
		};
		if (await tryStream(workingIndex) === "online") statusResult = "online";
		else {
			let found = false;
			for (let i = 0; i < channel.streams.length; i++) {
				if (i === workingIndex) continue;
				const r = await tryStream(i);
				if (r === "online") {
					workingIndex = i;
					statusResult = "online";
					found = true;
					break;
				} else statusResult = r;
			}
			if (!found) workingIndex = 0;
		}
		setStatus(statusResult);
		if (statusResult === "online") {
			open(channel, workingIndex);
			await recordHealth(channel.id, "online", workingIndex);
			await recordHistory(channel.id);
		} else await recordHealth(channel.id, statusResult, workingIndex);
	}, [channel, open]);
	(0, import_react.useEffect)(() => {
		if (!channel) {
			if (!cat.isLoading) setStatus("error");
			return;
		}
		runCheck();
		isFavourite(channel.id).then(setFav);
	}, [
		channel,
		runCheck,
		cat.isLoading
	]);
	(0, import_react.useEffect)(() => {
		if (!channel) return;
		const onFavChange = () => isFavourite(channel.id).then(setFav);
		window.addEventListener("favchange", onFavChange);
		return () => window.removeEventListener("favchange", onFavChange);
	}, [channel]);
	const onFatalPlayerError = (0, import_react.useCallback)(() => {
		setStatus("recovering");
		runCheck(true);
		toast.error("Playback failed", {
			description: "The stream stopped unexpectedly.",
			duration: 8e3,
			action: {
				label: "Try again",
				onClick: () => runCheck(true)
			}
		});
	}, [runCheck]);
	const toggleFav = (0, import_react.useCallback)(async () => {
		if (!channel) return;
		if (fav) {
			await removeFavourite(channel.id);
			setFav(false);
			toast.success("Removed from favourites", { duration: 2e3 });
		} else {
			await addFavourite(channel.id);
			setFav(true);
			toast.success(`${channel.name} added to favourites`, { duration: 2e3 });
		}
	}, [channel, fav]);
	const onBack = (0, import_react.useCallback)(() => {
		if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
		else navigate({ to: "/browse" });
	}, [navigate]);
	if (cat.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer mx-auto aspect-video max-w-5xl rounded-xl" });
	if (!channel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl",
				children: "Channel not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-[var(--text-tertiary)]",
				children: "It may have been removed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/browse",
				className: "btn-primary mt-4 inline-flex",
				children: "Browse channels"
			})
		]
	});
	const showPlayer = status === "online";
	const showRecovery = status === "blocked" || status === "timeout" || status === "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onBack,
			className: "mb-4 inline-flex items-center gap-1.5 text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors active:scale-95",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5 min-w-0",
				children: [
					showPlayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
							channel,
							onFatalError: onFatalPlayerError
						})
					}),
					(status === "checking" || status === "recovering") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shimmer relative aspect-video w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] text-[var(--text-tertiary)] font-medium animate-pulse",
								children: status === "checking" ? "Verifying stream connection..." : "Re-connecting to stream..."
							})]
						})
					}),
					showRecovery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
								status,
								size: "md"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base font-medium",
									children: "This channel isn't responding right now."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[13px] text-[var(--text-tertiary)]",
									children: "Public IPTV links come and go. Try an alternative below — they're picked from channels in the same category."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => runCheck(true),
									className: "btn-ghost mt-3 text-[12px] active:scale-95 transition-transform",
									children: "Try again"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-2 px-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex flex-wrap justify-between items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-wrap items-center gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "truncate font-display text-xl sm:text-2xl font-semibold tracking-tight",
											children: channel.name
										}),
										flagCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: `https://flagcdn.com/w20/${flagCode}.png`,
											srcSet: `https://flagcdn.com/w40/${flagCode}.png 2x`,
											width: 20,
											height: 15,
											alt: channel.country,
											title: channel.country,
											className: "rounded-[2px] object-cover shrink-0 shadow-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })
									]
								}), catNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: catNames.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--text-tertiary)] font-medium",
										children: n
									}, n))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: toggleFav,
									className: "btn-ghost inline-flex items-center gap-1.5 active:scale-95 transition-transform",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-3.5 ${fav ? "fill-[var(--accent)] text-[var(--accent)]" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: fav ? "Favourited" : "Favourite"
									})]
								}), channel.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: channel.website,
									target: "_blank",
									rel: "noreferrer",
									className: "btn-ghost inline-flex items-center gap-1.5 active:scale-95 transition-transform",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Site"
									})]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "block lg:hidden",
						id: "mobile-alts-section",
						children: cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileAlternativesGrid, {
							catalog: cat.data,
							failedChannelId: channel.id,
							showRecovery
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:flex flex-col gap-5 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-1 flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] shrink-0",
						children: showRecovery ? "Working Alternatives" : "Recommended Channels"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlternativesVerticalList, {
							catalog: cat.data,
							failedChannelId: channel.id,
							limit: 8
						})
					})]
				})
			})]
		})]
	});
}
function MobileAlternativesGrid({ catalog, failedChannelId, showRecovery }) {
	const navigate = useNavigate();
	const player = usePlayer();
	const sectionRef = (0, import_react.useRef)(null);
	const [limit, setLimit] = (0, import_react.useState)(4);
	(0, import_react.useEffect)(() => {
		const calculate = () => {
			const el = sectionRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const viewportH = window.innerHeight;
			const bottomTabH = 72;
			const headerH = 32;
			const gapH = 8;
			const available = viewportH - rect.top - bottomTabH - headerH;
			const cardH = Math.round((window.innerWidth / 2 - 20) * (9 / 16)) + 48;
			setLimit(Math.max(1, Math.floor(available / (cardH + gapH))) * 2);
		};
		calculate();
		window.addEventListener("resize", calculate);
		return () => window.removeEventListener("resize", calculate);
	}, []);
	const ids = (0, import_react.useMemo)(() => {
		const failed = failedChannelId ? catalog.channels[failedChannelId] : null;
		if (!failed) return catalog.indexes.all_ids.slice(0, limit);
		const failedCats = new Set(failed.categories);
		const failedCountry = failed.country;
		const scored = [];
		for (const id of catalog.indexes.all_ids) {
			if (id === failed.id) continue;
			const c = catalog.channels[id];
			if (!c) continue;
			const overlap = c.categories.filter((x) => failedCats.has(x)).length;
			if (overlap === 0) continue;
			const score = overlap * 10 + (c.country === failedCountry ? 5 : 0);
			scored.push({
				id,
				score
			});
		}
		scored.sort((a, b) => b.score - a.score);
		const result = scored.slice(0, limit).map((s) => s.id);
		if (result.length < limit) for (const id of catalog.indexes.all_ids) {
			if (id === failed.id || result.includes(id)) continue;
			result.push(id);
			if (result.length >= limit) break;
		}
		return result.slice(0, limit);
	}, [
		catalog,
		failedChannelId,
		limit
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: sectionRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]",
			children: showRecovery ? "Working alternatives" : "More like this"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: ids.map((id) => {
				const c = catalog.channels[id];
				if (!c) return null;
				const code = c.country ? toFlagCode(c.country) : "";
				const catName = catalog.meta.categories.find((ca) => ca.id === c.categories[0])?.name ?? c.categories[0] ?? "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: async () => {
						const first = c.streams[0];
						const toastId = `stream-${c.id}`;
						toast.loading(`Connecting…`, { id: toastId });
						const result = await checkStream(first.url, first.referrer, first.user_agent);
						if (result === "online") {
							toast.dismiss(toastId);
							player.open(c);
							navigate({
								to: "/watch/$channelId",
								params: { channelId: c.id }
							});
						} else toast.error(c.name, {
							id: toastId,
							description: streamErrorMsg(result),
							duration: 6e3,
							action: {
								label: "Open anyway",
								onClick: () => {
									toast.dismiss(toastId);
									player.open(c);
									navigate({
										to: "/watch/$channelId",
										params: { channelId: c.id }
									});
								}
							}
						});
					},
					className: "flex flex-col overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] text-left transition-all active:scale-[0.97] active:bg-[var(--surface-2)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-video w-full bg-[var(--surface-2)] flex items-center justify-center",
						children: c.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.logo_url,
							alt: c.name,
							className: "max-h-[60%] max-w-[60%] object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "size-6 text-[var(--text-tertiary)]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 px-2.5 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[12px] font-semibold text-[var(--text-primary)]",
								children: c.name
							}), catName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[10px] text-[var(--text-tertiary)] mt-0.5",
								children: catName
							})]
						}), code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `https://flagcdn.com/w20/${code}.png`,
							width: 14,
							height: 10,
							alt: c.country,
							className: "shrink-0 rounded-[2px] object-cover"
						})]
					})]
				}, id);
			})
		})]
	});
}
function AlternativesVerticalList({ catalog, failedChannelId, limit = 6 }) {
	const navigate = useNavigate();
	const player = usePlayer();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-2.5",
		children: (0, import_react.useMemo)(() => {
			const failed = failedChannelId ? catalog.channels[failedChannelId] : null;
			if (!failed) return catalog.indexes.all_ids.slice(0, limit);
			const failedCats = new Set(failed.categories);
			const failedCountry = failed.country;
			const scored = [];
			for (const id of catalog.indexes.all_ids) {
				if (id === failed.id) continue;
				const c = catalog.channels[id];
				if (!c) continue;
				const overlap = c.categories.filter((x) => failedCats.has(x)).length;
				if (overlap === 0) continue;
				const score = overlap * 10 + (c.country === failedCountry ? 5 : 0);
				scored.push({
					id,
					score
				});
			}
			scored.sort((a, b) => b.score - a.score);
			const result = scored.slice(0, limit).map((s) => s.id);
			if (result.length < Math.min(10, limit)) for (const id of catalog.indexes.all_ids) {
				if (id === failed.id) continue;
				if (!result.includes(id)) result.push(id);
				if (result.length >= limit) break;
			}
			return result;
		}, [
			catalog,
			failedChannelId,
			limit
		]).map((id) => {
			const c = catalog.channels[id];
			if (!c) return null;
			const code = c.country ? toFlagCode(c.country) : "";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: async () => {
					const first = c.streams[0];
					const toastId = `stream-${c.id}`;
					toast.loading(`Connecting to ${c.name}...`, { id: toastId });
					const result = await checkStream(first.url, first.referrer, first.user_agent);
					if (result === "online") {
						toast.dismiss(toastId);
						player.open(c);
						navigate({
							to: "/watch/$channelId",
							params: { channelId: c.id }
						});
					} else toast.error(c.name, {
						id: toastId,
						description: streamErrorMsg(result),
						duration: 6e3,
						action: {
							label: "Open anyway",
							onClick: () => {
								toast.dismiss(toastId);
								player.open(c);
								navigate({
									to: "/watch/$channelId",
									params: { channelId: c.id }
								});
							}
						}
					});
				},
				className: "flex items-start gap-3 w-full p-1.5 text-left rounded-lg hover:bg-[var(--surface-2)] transition-all duration-150 active:scale-[0.985]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-video w-28 h-[63px] shrink-0 rounded-md bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden",
					children: c.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.logo_url,
						alt: "",
						className: "max-h-[75%] max-w-[75%] object-contain"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "size-5 text-[var(--text-disabled)]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 py-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-[13.5px] font-semibold text-[var(--text-primary)]",
							children: c.name
						}), code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `https://flagcdn.com/w20/${code}.png`,
							width: 14,
							height: 10,
							alt: "",
							className: "rounded-[1.5px] shrink-0 shadow-sm"
						})]
					}), c.categories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[11.5px] text-[var(--text-secondary)] mt-1.5 font-medium",
						children: c.categories[0]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-[var(--text-disabled)] mt-1.5 font-mono text-[9px] uppercase tracking-wide",
						children: "No category"
					})]
				})]
			}, id);
		})
	});
}
//#endregion
export { WatchPage as component };
