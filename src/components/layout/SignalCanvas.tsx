import React, { useEffect, useRef } from "react";
import { shouldReduceMotion } from "../../utils/motion";

export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = shouldReduceMotion();
    let animationId: number;
    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    // Seeded PRNG (mulberry32) - reproducible nodes positioning
    function mulberry32(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const SEED = 47280;
    const rand = mulberry32(SEED);

    const resize = () => {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = document.documentElement.scrollHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = document.documentElement.scrollHeight + "px";
    };

    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 820 ? 30 : 60;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
      hue: "primary" | "secondary";
    }[] = [];

    for (let n = 0; n < count; n++) {
      nodes.push({
        x: rand() * W,
        y: rand() * H,
        vx: (rand() - 0.5) * 0.14 * DPR,
        vy: (rand() - 0.5) * 0.14 * DPR,
        r: 0.6 + rand() * 1.4,
        phase: rand() * Math.PI * 2,
        hue: rand() > 0.72 ? "primary" : "secondary",
      });
    }

    const linkDist = 130 * DPR;
    const mouse = { x: -9999, y: -9999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX * DPR;
      mouse.y = (e.clientY + window.scrollY) * DPR;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      // Detect theme dynamically
      const isDark = document.documentElement.classList.contains("dark");
      
      // Light Mode colors: Sage and Grey
      // Dark Mode colors: Cyan and Amber
      const primaryColor = isDark ? "79,209,197" : "90,90,64"; // Cyan / Sage
      const secondaryColor = isDark ? "232,163,61" : "112,112,107"; // Amber / Muted Grey

      for (let a = 0; a < nodes.length; a++) {
        const p = nodes[a];
        
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const boost = dm < 160 * DPR ? 1 - dm / (160 * DPR) : 0;

        for (let b = a + 1; b < nodes.length; b++) {
          const q = nodes[b];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * (0.08 + boost * 0.32);
            const activeColor = p.hue === "primary" ? primaryColor : secondaryColor;
            ctx.strokeStyle = `rgba(${activeColor},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const pulse = 0.55 + 0.45 * Math.sin(t * 0.001 + p.phase);
        const activeColor = p.hue === "primary" ? primaryColor : secondaryColor;
        ctx.fillStyle = `rgba(${activeColor},${(0.3 + boost * 0.5) * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * DPR * (1 + boost * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    if (reduceMotion) {
      draw(0);
    } else {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.4] dark:opacity-[0.7] transition-opacity duration-300"
    />
  );
}
