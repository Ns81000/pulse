import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ImmersiveLandingProps {
  onClose: () => void;
}

export function ImmersiveLanding({ onClose }: ImmersiveLandingProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  // Trigger entrance stagger animations after mount
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Track mouse coordinates with client bounds
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  // Main Canvas animation logic (Luminous Liquid Waves at the bottom only)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic sizing listener
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = mouseRef.current;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    // Wave state variables
    let phase1 = 0;
    let phase2 = 2.5;
    let phase3 = 4.8;
    let waveAmplitudeMultiplier = 1.0;

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates with damping
      if (mouse.active) {
        if (currentMouseX === -1000) {
          currentMouseX = mouse.targetX;
          currentMouseY = mouse.targetY;
        } else {
          currentMouseX += (mouse.targetX - currentMouseX) * 0.12;
          currentMouseY += (mouse.targetY - currentMouseY) * 0.12;
        }
      } else {
        currentMouseX += (-1000 - currentMouseX) * 0.08;
        currentMouseY += (-1000 - currentMouseY) * 0.08;
      }

      // Smooth wave flatline on exit transition
      if (isExiting) {
        waveAmplitudeMultiplier += (0.0 - waveAmplitudeMultiplier) * 0.1;
      }

      // 1. Render Layered Filled Luminous Waves at the bottom
      const drawFluidWave = (
        phase: number,
        baseHeight: number,
        amplitude: number,
        frequency: number,
        gradientTopColor: string,
        gradientBottomColor: string,
      ) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 3) {
          let activeAmplitude = amplitude * waveAmplitudeMultiplier;

          if (currentMouseX !== -1000) {
            const distanceToCursorX = Math.abs(x - currentMouseX);
            if (distanceToCursorX < 320) {
              const hoverFactor = 1 - distanceToCursorX / 320;
              activeAmplitude += hoverFactor * 16 * Math.sin(phase * 1.2) * waveAmplitudeMultiplier;
            }
          }

          const y = baseHeight - Math.sin(x * frequency + phase) * activeAmplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, baseHeight - amplitude, 0, height);
        waveGradient.addColorStop(0, gradientTopColor);
        waveGradient.addColorStop(1, gradientBottomColor);

        ctx.fillStyle = waveGradient;
        ctx.fill();
      };

      // Draw three parallax liquid layers from back to front with high opacity visibility
      drawFluidWave(
        phase1,
        height * 0.88,
        28,
        0.0016,
        "rgba(229, 72, 77, 0.08)",
        "rgba(229, 72, 77, 0.002)",
      );

      drawFluidWave(
        phase2,
        height * 0.91,
        20,
        0.0034,
        "rgba(229, 72, 77, 0.16)",
        "rgba(229, 72, 77, 0.005)",
      );

      drawFluidWave(
        phase3,
        height * 0.94,
        14,
        0.0062,
        "rgba(229, 72, 77, 0.28)",
        "rgba(229, 72, 77, 0.01)",
      );

      // Increment phases
      phase1 += isExiting ? 0.06 : 0.004;
      phase2 -= isExiting ? 0.04 : 0.005;
      phase3 += isExiting ? 0.08 : 0.009;

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isExiting]);

  // Handle Exit Animation Choreography
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 w-full h-full z-[100] bg-[#010102] flex flex-col justify-center items-center overflow-hidden select-none transition-all duration-800 ${
        isExiting
          ? "opacity-0 translate-y-[-100%] pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      {/* ── Background Canvas (Liquid Waves Only) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ── Center Immersive Layout (Hero Brand Identity) ── */}
      <main className="relative z-10 flex flex-col justify-center items-center px-6">
        <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8 sm:gap-11">
          {/* Custom Animated Dot Matrix SVG Logo - flat and solid (no glows) */}
          <div
            className={`w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] flex items-center justify-center transition-all duration-1000 ${
              isMounted && !isExiting ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="-7 -7 131 131"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {[
                { cx: 0, cy: 0, f: "#34343a", d: 100 },
                { cx: 0, cy: 22, f: "#e5484d", d: 140 },
                { cx: 0, cy: 44, f: "#e5484d", d: 180 },
                { cx: 0, cy: 66, f: "#e5484d", d: 220 },
                { cx: 0, cy: 88, f: "#e5484d", d: 260 },
                { cx: 0, cy: 110, f: "#e5484d", d: 300 },
                { cx: 22, cy: 0, f: "#34343a", d: 120 },
                { cx: 22, cy: 22, f: "#34343a", d: 160 },
                { cx: 22, cy: 44, f: "#e5484d", d: 200 },
                { cx: 22, cy: 66, f: "#34343a", d: 240 },
                { cx: 22, cy: 88, f: "#34343a", d: 280 },
                { cx: 22, cy: 110, f: "#e5484d", d: 320 },
                { cx: 44, cy: 0, f: "#34343a", d: 140 },
                { cx: 44, cy: 22, f: "#34343a", d: 180 },
                { cx: 44, cy: 44, f: "#34343a", d: 220 },
                { cx: 44, cy: 66, f: "#34343a", d: 260 },
                { cx: 44, cy: 88, f: "#34343a", d: 300 },
                { cx: 44, cy: 110, f: "#e5484d", d: 340 },
                { cx: 66, cy: 0, f: "#e5484d", d: 160 },
                { cx: 66, cy: 22, f: "#e5484d", d: 200 },
                { cx: 66, cy: 44, f: "#e5484d", d: 240 },
                { cx: 66, cy: 66, f: "#e5484d", d: 280 },
                { cx: 66, cy: 88, f: "#e5484d", d: 320 },
                { cx: 66, cy: 110, f: "#e5484d", d: 360 },
                { cx: 88, cy: 0, f: "#e5484d", d: 180 },
                { cx: 88, cy: 22, f: "#34343a", d: 220 },
                { cx: 88, cy: 44, f: "#34343a", d: 260 },
                { cx: 88, cy: 66, f: "#e5484d", d: 300 },
                { cx: 88, cy: 88, f: "#34343a", d: 340 },
                { cx: 88, cy: 110, f: "#e5484d", d: 380 },
                { cx: 110, cy: 0, f: "#34343a", d: 200 },
                { cx: 110, cy: 22, f: "#e5484d", d: 240 },
                { cx: 110, cy: 44, f: "#e5484d", d: 280 },
                { cx: 110, cy: 66, f: "#34343a", d: 320 },
                { cx: 110, cy: 88, f: "#e5484d", d: 360 },
                { cx: 110, cy: 110, f: "#34343a", d: 400 },
              ].map((dot, idx) => (
                <circle
                  key={idx}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="7"
                  fill={dot.f}
                  className="transition-transform duration-800"
                  style={{
                    animation: `logo-dot-entrance 0.9s cubic-bezier(0.23, 1, 0.32, 1) both`,
                    animationDelay: `${dot.d}ms`,
                    transformOrigin: `${dot.cx}px ${dot.cy}px`,
                  }}
                />
              ))}
            </svg>
          </div>

          <style>{`
            @keyframes logo-dot-entrance {
              from {
                opacity: 0;
                transform: scale(0.3) translate(10px, 10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translate(0, 0);
              }
            }
          `}</style>

          {/* Wordmark, Tagline and Underscore */}
          <div className="flex flex-col items-center">
            {/* Project Wordmark (styled exactly like index.tsx hero) - flat & solid */}
            <h1
              className={`font-display font-bold text-[var(--text-primary)] tracking-[-0.04em] text-[3.4rem] sm:text-[4rem] leading-[1.05] sm:leading-[1.1] transition-all duration-1000 delay-[150ms] ${
                isMounted && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Pulse
            </h1>

            {/* Tagline and Underscore (Left-aligned relative to each other so underscore fits below "Feel") */}
            <div
              className={`mt-2 flex flex-col items-start transition-all duration-1000 delay-[280ms] ${
                isMounted && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="font-mono text-[12px] sm:text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase">
                Feel Everything
              </p>
              <div className="mt-1 h-[2px] w-9 sm:w-9 rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          {/* Premium "Enter Experience" Trigger Button */}
          <div
            className={`mt-4 transition-all duration-1000 delay-[360ms] ${
              isMounted && !isExiting
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-6"
            }`}
          >
            <button
              onClick={handleEnter}
              className="relative group flex items-center gap-3.5 px-8 py-4 bg-transparent text-[13px] font-mono tracking-[0.2em] uppercase text-white border border-white/10 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:text-white active:scale-97 active:bg-white/[0.02]"
              style={{
                boxShadow: "0 0 0 0 rgba(229,72,77,0)",
              }}
            >
              {/* Animated Hover Background Fill */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-[rgba(229,72,77,0.12)] to-[rgba(229,72,77,0.02)] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
                style={{ zIndex: -1 }}
              />

              {/* Subtle pulsing outer ring on hover */}
              <div className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-0 scale-95 transition-all duration-500 group-hover:opacity-60 group-hover:scale-100 pointer-events-none" />

              <span>Enter</span>
              <ArrowRight className="size-4 text-[var(--text-tertiary)] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--accent)]" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
