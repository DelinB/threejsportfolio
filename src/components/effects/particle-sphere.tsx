"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive particle sphere — ported 1:1 from the original site's
 * canvas engine (same lat/lon lattice, ribbon field math, color
 * ramps, perspective projection, drag physics, idle spin and
 * visibility-change pausing).
 *
 * Migration note: the original drove the sphere's scroll motion with
 * GSAP + ScrollTrigger (~90 KB of JavaScript). The exact same
 * scrubbed timeline is reproduced here with ~60 lines of native
 * keyframe interpolation on scroll progress, eliminating the
 * dependency entirely. Keyframes below are lifted directly from the
 * original GSAP timeline positions (easing "none", scrub 1.2).
 */

interface Particle {
  x0: number;
  y0: number;
  z0: number;
  ribbon: number;
}

interface DrawItem {
  px: number;
  py: number;
  z: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
}

type KeyFrame = { t: number; v: number };

/* GSAP timeline keyframes (progress 0..1 → scroll bottom) */
const POS_X: KeyFrame[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: 1.4 * 60 },
  { t: 0.45, v: -0.4 * 60 },
  { t: 0.6, v: 1.2 * 60 },
  { t: 0.7, v: -1.7 * 60 },
  { t: 0.85, v: -1.7 * 60 },
  { t: 1, v: 0 },
];
const POS_Y: KeyFrame[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: -0.2 * 40 },
  { t: 0.45, v: 0.1 * 40 },
  { t: 0.6, v: -0.1 * 40 },
  { t: 0.7, v: 0.05 * 40 },
  { t: 0.85, v: 0.05 * 40 },
  { t: 1, v: 0.2 * 40 },
];
const POS_Z: KeyFrame[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: 0.3 },
  { t: 0.45, v: 0.4 },
  { t: 0.6, v: 0.2 },
  { t: 0.7, v: 0.6 },
  { t: 0.85, v: 0.6 },
  { t: 1, v: -1.2 },
];
const ROT_Y: KeyFrame[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: Math.PI * 0.55 },
  { t: 0.45, v: Math.PI * 1.05 },
  { t: 0.6, v: Math.PI * 1.3 },
  { t: 0.85, v: Math.PI * 1.3 },
  { t: 1, v: Math.PI * 1.6 },
];
const ROT_X: KeyFrame[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: 0.3 },
  { t: 0.45, v: 0.1 },
  { t: 0.6, v: 0 },
  { t: 0.85, v: 0 },
  { t: 1, v: 0.1 },
];
const SCALE: KeyFrame[] = [
  { t: 0, v: 1 },
  { t: 0.22, v: 0.92 },
  { t: 0.45, v: 0.95 },
  { t: 0.6, v: 1.05 },
  { t: 0.85, v: 1.05 },
  { t: 1, v: 0.55 },
];

function trackValue(kfs: KeyFrame[], p: number): number {
  if (p <= kfs[0].t) return kfs[0].v;
  for (let i = 1; i < kfs.length; i++) {
    if (p <= kfs[i].t) {
      const a = kfs[i - 1];
      const b = kfs[i];
      const f = (p - a.t) / (b.t - a.t);
      return a.v + (b.v - a.v) * f;
    }
  }
  return kfs[kfs.length - 1].v;
}

function smoothstep(e0: number, e1: number, x: number): number {
  let t = (x - e0) / (e1 - e0);
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

function bandValue(
  theta: number,
  phi: number,
  bandAngle: number,
  v0: number,
  width: number,
  uFreq: number,
  uPhase: number,
  lengthLo: number,
  lengthHi: number,
): number {
  const ca = Math.cos(bandAngle);
  const sa = Math.sin(bandAngle);
  const u = theta * ca + phi * sa;
  const v = -theta * sa + phi * ca;
  let closeness = Math.max(0, 1 - Math.abs(v - v0) / width);
  closeness = Math.pow(closeness, 1.5);
  const fold = Math.cos(u * uFreq + uPhase);
  const corrug = fold * 0.5 + 0.5;
  const lengthMask =
    smoothstep(lengthLo - 0.4, lengthLo, u) * (1 - smoothstep(lengthHi, lengthHi + 0.4, u));
  return closeness * (0.55 + 0.55 * corrug) * lengthMask;
}

function ribbonField(theta: number, phi: number): number {
  const b1 = bandValue(theta, phi, (50 * Math.PI) / 180, -0.05, 0.32, 3.6, 0.0, -1.6, 1.05);
  const b2 = bandValue(theta, phi, (18 * Math.PI) / 180, 0.55, 0.28, 4.5, 1.0, -0.6, 1.4);
  return Math.max(b1, b2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* Color ramps */
const CREAM = [255, 246, 220];
const GOLD = [255, 206, 132];
const ORANGE = [255, 140, 86];
const MAGENTA = [200, 58, 132];
const DEEPBLUE = [24, 9, 52];

function mixC(c1: number[], c2: number[], t: number, out: number[]): number[] {
  out[0] = lerp(c1[0], c2[0], t);
  out[1] = lerp(c1[1], c2[1], t);
  out[2] = lerp(c1[2], c2[2], t);
  return out;
}

function baseColor(latT: number, out: number[]): number[] {
  if (latT < 0.28) return mixC(CREAM, GOLD, latT / 0.28, out);
  if (latT < 0.55) return mixC(GOLD, ORANGE, (latT - 0.28) / 0.27, out);
  if (latT < 0.8) return mixC(ORANGE, MAGENTA, (latT - 0.55) / 0.25, out);
  return mixC(MAGENTA, DEEPBLUE, (latT - 0.8) / 0.2, out);
}

const PERSPECTIVE = 3.4;
const LAT_STEPS = 108;
const LON_STEPS = 136;

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    const glowCanvas = document.createElement("canvas");

    function renderGlow() {
      glowCanvas.width = Math.max(1, Math.round(W * DPR));
      glowCanvas.height = Math.max(1, Math.round(H * DPR));
      if (!W || !H) return;
      const g = glowCanvas.getContext("2d");
      if (!g) return;
      g.setTransform(DPR, 0, 0, DPR, 0, 0);
      const R = Math.min(W, H) * 0.335;
      const cx = W / 2;
      const cy = H / 2;
      const layers: Array<[number, number, number, string]> = [
        [cx - R * 0.05, cy - R * 0.45, R * 0.85, "rgba(255,210,150,0.30)"],
        [cx + R * 0.25, cy + R * 0.05, R * 0.95, "rgba(255,130,95,0.20)"],
        [cx + R * 0.05, cy + R * 0.5, R * 0.75, "rgba(210,75,125,0.16)"],
      ];
      for (const [gx, gy, gr, col] of layers) {
        const grad = g.createRadialGradient(gx, gy, 0, gx, gy, gr);
        grad.addColorStop(0, col);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, W, H);
      }
    }

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.max(1, Math.round(W * DPR));
      canvas.height = Math.max(1, Math.round(H * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      renderGlow();
    };

    /* Build particle lattice */
    const particles: Particle[] = [];
    for (let i = 0; i < LAT_STEPS; i++) {
      const theta = -Math.PI / 2 + (i / (LAT_STEPS - 1)) * Math.PI;
      const y0 = -Math.sin(theta);
      const ring = Math.cos(theta);
      for (let j = 0; j < LON_STEPS; j++) {
        const phi = (j / LON_STEPS) * Math.PI * 2 - Math.PI;
        const x0 = ring * Math.cos(phi);
        const z0 = ring * Math.sin(phi);
        particles.push({ x0, y0, z0, ribbon: ribbonField(theta, phi) });
      }
    }

    /* Sphere state */
    const IDLE_SPIN = reduced ? 0 : 0.0016;
    const MAX_FLICK_SPIN = 0.05;
    let rotX = -0.3;
    let rotY = 0.62;
    let velX = 0;
    let velY = IDLE_SPIN;
    let dragging = false;
    let lastPX = 0;
    let lastPY = 0;
    let activePointer: number | null = null;
    let paused = false;
    let rafId = 0;

    /* Scroll-driven "virtual core" — native replacement for the GSAP timeline */
    let targetProgress = 0;
    let smoothProgress = 0;
    let lastTime = 0;

    function onScroll() {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function pointerDown(x: number, y: number) {
      dragging = true;
      lastPX = x;
      lastPY = y;
    }

    function pointerMove(x: number, y: number) {
      if (!dragging) return;
      const dx = x - lastPX;
      const dy = y - lastPY;
      velY = Math.max(-MAX_FLICK_SPIN, Math.min(MAX_FLICK_SPIN, -dx * 0.0045));
      velX = Math.max(-MAX_FLICK_SPIN, Math.min(MAX_FLICK_SPIN, -dy * 0.0045));
      rotY += velY;
      rotX += velX;
      rotX = Math.max(-1.3, Math.min(1.3, rotX));
      lastPX = x;
      lastPY = y;
    }

    function pointerUp() {
      dragging = false;
    }

    const EXCLUDE_SELECTOR =
      "a, button, input, textarea, select, .work-row, .clip, .svc-head, .menu, .modal";

    function onPointerDown(e: PointerEvent) {
      if ((e.target as Element | null)?.closest?.(EXCLUDE_SELECTOR)) return;
      if (activePointer !== null) return;
      activePointer = e.pointerId;
      pointerDown(e.clientX, e.clientY);
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerId !== activePointer) return;
      pointerMove(e.clientX, e.clientY);
    }

    function releasePointer(e: PointerEvent) {
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      pointerUp();
    }

    const drawPool: DrawItem[] = new Array(particles.length);
    for (let i = 0; i < drawPool.length; i++) {
      drawPool[i] = { px: 0, py: 0, z: 0, r: 0, g: 0, b: 0, a: 0, size: 0 };
    }
    /* Reused sort buffer — avoids a per-frame allocation of ~7k refs */
    const sortPool: DrawItem[] = [];
    const tmpA = [0, 0, 0];
    const tmpB = [0, 0, 0];
    const tmpC = [0, 0, 0];
    const tmpD = [0, 0, 0];

    const frame = (time: number) => {
      rafId = 0;
      if (paused) return;

      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 0.016;
      lastTime = time;

      /* scrub: 1.2 equivalent — exponential catch-up smoothing */
      smoothProgress += (targetProgress - smoothProgress) * (1 - Math.exp(-dt / 0.35));

      const p = smoothProgress;
      const posX = trackValue(POS_X, p);
      const posY = trackValue(POS_Y, p);
      const posZ = trackValue(POS_Z, p);
      const rotCoreY = trackValue(ROT_Y, p);
      const rotCoreX = trackValue(ROT_X, p);
      const scale = trackValue(SCALE, p);

      if (!dragging) {
        velY += (IDLE_SPIN - velY) * 0.02;
        rotY += velY;
        velX *= 0.94;
        rotX += velX;
        rotX = Math.max(-1.3, Math.min(1.3, rotX));
      }

      const finalRotX = rotX + rotCoreX;
      const finalRotY = rotY + rotCoreY;
      const R = Math.min(W, H) * 0.335 * scale;
      const cosX = Math.cos(finalRotX);
      const sinX = Math.sin(finalRotX);
      const cosY = Math.cos(finalRotY);
      const sinY = Math.sin(finalRotY);
      const cx = W * 0.5 + posX;
      const cy = H * 0.5 + posY;
      const sizeScale = W / 720;

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(glowCanvas, 0, 0, W, H);

      let count = 0;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const bulge = 1 + Math.min(pt.ribbon, 1.2) * 0.09;
        const xB = pt.x0 * bulge;
        const yB = pt.y0 * bulge;
        const zB = pt.z0 * bulge;
        const x1 = xB * cosY - zB * sinY;
        const z1 = xB * sinY + zB * cosY;
        const y1 = yB * cosX - z1 * sinX;
        const z2 = yB * sinX + z1 * cosX;
        if (z2 < 0.02) continue;
        const factor = PERSPECTIVE / (PERSPECTIVE - z2);
        const px = cx + x1 * R * factor;
        const py = cy + y1 * R * factor;
        const latT = Math.max(0, Math.min(1, (1 + y1) / 2));
        const base = baseColor(latT, tmpA);
        const strength = Math.max(0, Math.min(1, pt.ribbon));
        const s2 = strength * strength * (3 - 2 * strength);
        const dim = mixC(DEEPBLUE, base, 0.5, tmpB);
        const bright = mixC(base, CREAM, 0.55, tmpC);
        const col = mixC(dim, bright, s2, tmpD);
        const topBoost = Math.max(0, 0.32 - latT) * 0.5;
        const dimA = 0.34 + 0.2 * factor + topBoost;
        const brightA = Math.min(1, 0.34 + s2 * 0.85);
        const alpha = lerp(dimA, brightA, s2);
        const dimSize = 0.85 * factor;
        const brightSize = (0.9 + s2 * 1.5) * factor;
        const size = lerp(dimSize, brightSize, s2) * sizeScale;
        const d = drawPool[count++];
        d.px = px;
        d.py = py;
        d.z = z2;
        d.r = col[0] | 0;
        d.g = col[1] | 0;
        d.b = col[2] | 0;
        d.a = alpha;
        d.size = size;
      }

      sortPool.length = count;
      for (let i = 0; i < count; i++) sortPool[i] = drawPool[i];
      sortPool.sort((a, b) => a.z - b.z);
      for (let i = 0; i < count; i++) {
        const d = sortPool[i];
        ctx.fillStyle = `rgba(${d.r},${d.g},${d.b},${d.a})`;
        ctx.fillRect(d.px - d.size, d.py - d.size, d.size * 2, d.size * 2);
      }
      rafId = requestAnimationFrame(frame);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        paused = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        paused = false;
        lastTime = 0;
        if (!rafId) rafId = requestAnimationFrame(frame);
      }
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", releasePointer);
    document.addEventListener("pointercancel", releasePointer);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!rafId) rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", releasePointer);
      document.removeEventListener("pointercancel", releasePointer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sphereCanvas"
      aria-hidden="true"
      className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
    />
  );
}
