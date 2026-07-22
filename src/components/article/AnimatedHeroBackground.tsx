import React, { useEffect, useRef } from "react";
import { shouldReduceMotion } from "../../utils/motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface CodeWord {
  x: number;
  y: number;
  text: string;
  speed: number;
  opacity: number;
  fontSize: number;
}

const WORDS = [
  "const", "let", "function", "import", "return", "React", "AI", "Agent",
  "Codex", "Trae", "Claude", "Vite", "TypeScript", "01", "pipeline", "prompt",
  "workflow", "model", "orchestrate", "git", "deploy", "build", "state"
];

export function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = shouldReduceMotion();

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize Particles
    const particleCount = reducedMotion ? 15 : 60;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.6),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.6),
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? "rgba(249, 115, 22, " : i % 3 === 1 ? "rgba(251, 146, 60, " : "rgba(253, 186, 116, ", // different orange shades
      });
    }

    // Initialize CodeWords
    const wordCount = reducedMotion ? 5 : 18;
    const codeWords: CodeWord[] = [];
    for (let i = 0; i < wordCount; i++) {
      codeWords.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        speed: (Math.random() * 0.2 + 0.1) * (reducedMotion ? 0.2 : 1),
        opacity: Math.random() * 0.08 + 0.02,
        fontSize: Math.floor(Math.random() * 4) + 9, // 9px to 12px
      });
    }

    let pulseAngle = 0;

    // Animation Loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing background aura
      pulseAngle += reducedMotion ? 0.002 : 0.005;
      const pulse = Math.sin(pulseAngle) * 0.1 + 0.9; // 0.8 to 1.0

      const auraGradient = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        0,
        width / 2,
        height * 0.45,
        Math.min(width, height) * 0.5 * pulse
      );
      auraGradient.addColorStop(0, "rgba(249, 115, 22, 0.12)");
      auraGradient.addColorStop(0.3, "rgba(249, 115, 22, 0.04)");
      auraGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Code Words
      ctx.font = "bold 10px JetBrains Mono, monospace";
      codeWords.forEach((word) => {
        ctx.fillStyle = `rgba(249, 115, 22, ${word.opacity})`;
        ctx.font = `${word.fontSize}px JetBrains Mono, monospace`;
        ctx.fillText(word.text, word.x, word.y);

        word.y += word.speed;
        if (word.y > height + 20) {
          word.y = -20;
          word.x = Math.random() * width;
          word.text = WORDS[Math.floor(Math.random() * WORDS.length)];
        }
      });

      // 3. Update & Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.6)";
        ctx.fill();
      });

      // 4. Draw Connecting Lines
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-black"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
