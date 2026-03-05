import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* =========================
   1) BOOT INTRO (BLACK + TYPE)
   ========================= */
function BootIntro({ fading }: { fading: boolean }) {
  return (
    <div className={`bootIntro ${fading ? "fadeOut" : ""}`}>
      <div className="introText">
        <div className="introTop typeLine">
          Domain Expansion<span className="cursor stopA">█</span>
        </div>
        <div className="introMain typeLine delay">
          Infinite Void<span className="cursor stopB">█</span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   2) VOID ANIMATION — CANVAS
   ========================= */
function BootVoidScreen({ fading }: { fading: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const particles = Array.from({ length: 520 }, () => ({
      x: rand(0, W()),
      y: rand(0, H()),
      r: rand(0.6, 2.1),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.06, 0.06),
      tw: rand(0.6, 1.6),
      ph: rand(0, Math.PI * 2),
    }));

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const w = W();
      const h = H();
      const cx = w * 0.5;
      const cy = h * 0.45;

      
      const bg = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.9);
      bg.addColorStop(0, "rgba(12, 12, 32, 1)");
      bg.addColorStop(0.35, "rgba(0, 0, 0, 1)");
      bg.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // nebula fields (purple + cyan)
      for (let i = 0; i < 4; i++) {
        const ox = cx + Math.sin(t * (0.30 + i * 0.12)) * (140 + i * 80);
        const oy = cy + Math.cos(t * (0.22 + i * 0.10)) * (120 + i * 70);
        const g = ctx.createRadialGradient(ox, oy, 10, ox, oy, 520 + i * 220);


        const purple = i % 2 === 0;
        g.addColorStop(0, purple ? "rgba(180,70,255,0.14)" : "rgba(60,190,255,0.10)");
        g.addColorStop(0.35, purple ? "rgba(110,90,255,0.08)" : "rgba(60,190,255,0.06)");
        g.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // stars/particles
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const tw = 0.55 + 0.45 * Math.sin(t * p.tw + p.ph);
        ctx.beginPath();
        ctx.fillStyle = `rgba(230,241,255,${0.33 * tw})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // rings
      const ringBase = Math.min(w, h) * 0.28;
      const ringCount = 5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < ringCount; i++) {
        const r = ringBase + i * 44;
        const rot = t * (0.32 + i * 0.11) * (i % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.rotate(rot);


        ctx.setLineDash([10 + i * 2, 22 + i * 4]);
        ctx.lineWidth = Math.max(1, 2 - i * 0.12);
        ctx.strokeStyle = `rgba(180,70,255,${0.20 - i * 0.025})`;
        ctx.shadowColor = "rgba(110,90,255,0.40)";
        ctx.shadowBlur = 22;

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();


        ctx.setLineDash([]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = `rgba(60,190,255,${0.14 - i * 0.015})`;
        ctx.shadowColor = "rgba(60,190,255,0.30)";
        ctx.shadowBlur = 28;

        const a0 = (t * 0.85 + i) % (Math.PI * 2);
        ctx.beginPath();
        ctx.arc(0, 0, r, a0, a0 + 0.95);
        ctx.stroke();

        ctx.restore();
      }


      const core = ctx.createRadialGradient(0, 0, 10, 0, 0, ringBase * 0.95);
      core.addColorStop(0, "rgba(0,0,0,0.98)");
      core.addColorStop(0.55, "rgba(0,0,0,0.85)");
      core.addColorStop(0.70, "rgba(110,90,255,0.10)");
      core.addColorStop(0.85, "rgba(60,190,255,0.06)");
      core.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, ringBase * 0.95, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();


      const flick = (Math.sin(t * 11.5) + Math.sin(t * 7.2 + 1.2)) * 0.5;
      if (flick > 0.78) {
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(0, rand(0, h), w, 2);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`bootVoid ${fading ? "fadeOut" : ""}`}>
      <canvas ref={canvasRef} className="voidCanvas" />
    </div>
  );
}

/* =========================
   3) APP: Intro -> Void -> Routes
   ========================= */
export default function App(): React.JSX.Element {
  const [phase, setPhase] = useState<"intro" | "anim" | "devlog">("intro");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const introMs = 4500; // 2s per line (4s) + 0.5s pause
    const animMs = 4000;
    const fadeMs = 240;

    const t1 = window.setTimeout(() => setPhase("anim"), introMs);

    const t2 = window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => setPhase("devlog"), fadeMs);
    }, introMs + animMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "intro") return <BootIntro fading={fading} />;
  if (phase === "anim") return <BootVoidScreen fading={fading} />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* if someone types a random route */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      
    </>
  );
}

// 404 router

