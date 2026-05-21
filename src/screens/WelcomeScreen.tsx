import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, ChevronDown } from 'lucide-react';

interface WelcomeScreenProps {
  onCreate: () => void;
  onRestore: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreate, onRestore }) => {
  return (
    <div className="fixed inset-0 bg-bg flex flex-col overflow-hidden">
        {/* TOP NAV */}
        <nav className="relative z-20 flex items-start justify-between px-8 pt-5 pb-2 shrink-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-3">
              <BrandIcon />
              <BrandWordmark />
            </div>
            <span
              className="font-bold uppercase tracking-[0.22em] pl-[56px]"
              style={{ fontSize: 9, color: 'rgba(0, 199, 118, 0.5)', letterSpacing: '0.22em' }}
            >
              Secret Privacy Network
            </span>
          </div>
          <button
            className="hidden sm:flex items-center gap-1.5 rounded-full font-bold text-muted hover:text-text transition-colors"
            style={{ padding: '6px 14px', fontSize: 11, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
          >
            <span>English</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </nav>

        {/* MAIN BODY */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* LEFT CONTENT */}
          <motion.div
            className="relative z-10 flex flex-col justify-center px-8 lg:px-12 pb-6 w-full lg:w-[46%] shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="mb-6">
              <h1 className="tracking-tight leading-tight mb-3"
                style={{ fontSize: 'clamp(32px, 3.2vw, 48px)', lineHeight: 1.1, fontWeight: 800 }}
              >
                <span className="text-white block">Private communication.</span>
                <span className="block font-black" style={{ color: 'var(--accent)' }}>Reimagined.</span>
              </h1>
              <p className="font-medium leading-relaxed"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'var(--muted)', maxWidth: 400 }}
              >
                End-to-end encrypted messaging, calls,<br />
                and media sharing for a private world.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 mb-7">
              <FeatureCard icon={Lock} title="E2E Encrypted" sub="Always secure" />
              <FeatureCard icon={Shield} title="Private Identity" sub="Stay anonymous" />
              <FeatureCard icon={Zap} title="Offline First" sub="Works anywhere" />
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-6">
              <button onClick={onCreate} className="font-black text-bg-deep rounded-xl transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ padding: '12px 28px', fontSize: 13, minWidth: 140, minHeight: 46, background: 'var(--accent)' }}
              >
                Create Quivex ID
              </button>
              <button onClick={onRestore} className="font-bold text-white rounded-xl transition-all hover:bg-white/[0.04] active:scale-[0.97]"
                style={{ padding: '12px 24px', fontSize: 13, minWidth: 160, minHeight: 46, border: '1px solid rgba(255,255,255,0.13)', background: 'transparent' }}
              >
                I have an account
              </button>
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: 13 }}>
              <span className="font-black" style={{ color: 'var(--accent)' }}>Fast.</span>
              <span className="font-black" style={{ color: 'var(--accent)', opacity: 0.65 }}>Fluid.</span>
              <span className="font-bold" style={{ color: 'var(--muted)' }}>Private.</span>
            </div>
          </motion.div>

          {/* RIGHT: CANVAS ORBITAL GLOBE */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
            <OrbitalGlobe />
          </div>

          {/* Mobile ghost globe */}
          <div className="lg:hidden absolute right-0 top-0 bottom-0 w-40 flex items-center justify-center opacity-20 pointer-events-none">
            <OrbitalGlobeMini />
          </div>
        </div>
    </div>
  );
};

/* ======================== BRAND ASSETS ======================== */

const BrandIcon: React.FC = () => {
  const [err, setErr] = useState(false);
  if (err) return <span className="font-black text-sm shrink-0" style={{ color: 'var(--accent)' }}>QX</span>;
  return <img src="/icons/qx-icon.png" alt="" className="object-contain shrink-0 rounded-2xl" style={{ width: 64, height: 64 }} onError={() => setErr(true)} />;
};

const BrandWordmark: React.FC = () => {
  const [err, setErr] = useState(false);
  if (err) return null;
  return <img src="/brand/quivex-wordmark.png" alt="QUIVEX" className="object-contain brightness-110" style={{ height: 48 }} onError={() => setErr(true)} />;
};

/* ======================== FEATURE CARD ======================== */

const FeatureCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; sub: string }> = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-2.5 rounded-xl transition-all"
    style={{ padding: '10px 14px', background: 'var(--card)', border: '1px solid var(--border)', backdropFilter: 'blur(8px)', minWidth: 132 }}
  >
    <div className="flex items-center justify-center rounded-lg shrink-0"
      style={{ width: 32, height: 32, background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
    >
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <div className="font-black leading-tight text-white" style={{ fontSize: 11.5 }}>{title}</div>
      <div className="font-bold uppercase tracking-wider" style={{ fontSize: 9, color: 'var(--muted)' }}>{sub}</div>
    </div>
  </div>
);

/* ======================== CANVAS 3D ORBITAL GLOBE ======================== */

const OrbitalGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconErr, setIconErr] = useState(false);
  const W = 700, H = 560;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = W / 2, cy = H / 2;
    const FOV = 900;
    const GREEN = '#00C776';
    const GREEN_A = (a: number) => `rgba(0, 199, 118, ${a})`;

    // 3D projection
    const project = (x: number, y: number, z: number) => {
      const scale = FOV / (FOV + z);
      return { x: cx + x * scale, y: cy + y * scale, scale };
    };

    // Rotate point around Y axis (for sphere dots spin)
    const rotY = (x: number, y: number, z: number, a: number) => ({
      x: x * Math.cos(a) + z * Math.sin(a),
      y,
      z: -x * Math.sin(a) + z * Math.cos(a),
    });

    // Orbit: defined by tilt (rx = tilt from horizontal) and rotation offset
    // Opacity values reduced for low opacity orb/network lines
    const orbits = [
      { rx: 260, ry: 72, tilt: -18 * Math.PI / 180, speed: 0.3, color: 0.12, nodes: 3 },
      { rx: 230, ry: 62, tilt: 45 * Math.PI / 180, speed: -0.4, color: 0.08, nodes: 2 },
      { rx: 195, ry: 48, tilt: -62 * Math.PI / 180, speed: 0.25, color: 0.06, nodes: 2 },
    ];

    // Sphere dots
    const sphereDots: { x: number; y: number; z: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 9) {
      const r = Math.cos(lat * Math.PI / 180) * 160;
      const h = Math.sin(lat * Math.PI / 180) * 160;
      const count = Math.max(4, Math.round(r / 10));
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        sphereDots.push({ x: r * Math.cos(a), y: h, z: r * Math.sin(a) });
      }
    }

    // Orbit node angles (per orbit)
    const nodeAngles = orbits.map(o => Array.from({ length: o.nodes }, (_, i) => (i / o.nodes) * Math.PI * 2));
    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = frame * 0.005;

      // 1. Sphere dots (slowly rotating)
      const sphereSpin = t * 0.15;
      for (const d of sphereDots) {
        const rd = rotY(d.x, d.y, d.z, sphereSpin);
        const p = project(rd.x, rd.y, rd.z);
        if (p.scale < 0) continue;
        const alpha = 0.08 + (p.scale - 0.5) * 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = GREEN_A(Math.max(0.02, Math.min(0.2, alpha)));
        ctx.fill();
      }

      // 2. Orbit rings & nodes
      orbits.forEach((orb, oi) => {
        const angleOffset = t * orb.speed;

        // Draw ellipse ring (sample points)
        const pts: { px: number; py: number; z: number }[] = [];
        for (let i = 0; i <= 120; i++) {
          const a = (i / 120) * Math.PI * 2;
          // Ellipse in XZ plane, then tilt around Z axis
          const ex = orb.rx * Math.cos(a + angleOffset);
          const ey = orb.ry * Math.sin(a + angleOffset);
          // Tilt: rotate ex,ey around Z by tilt angle
          const rx = ex * Math.cos(orb.tilt) - ey * Math.sin(orb.tilt);
          const ry = ex * Math.sin(orb.tilt) + ey * Math.cos(orb.tilt);
          const p = project(rx, ry, 0);
          pts.push({ px: p.x, py: p.y, z: ry });
        }

        // Stroke ring
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
        ctx.closePath();
        ctx.strokeStyle = GREEN_A(orb.color);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw nodes
        nodeAngles[oi].forEach((baseA, ni) => {
          const a = baseA + angleOffset;
          const ex = orb.rx * Math.cos(a);
          const ey = orb.ry * Math.sin(a);
          const rx = ex * Math.cos(orb.tilt) - ey * Math.sin(orb.tilt);
          const ry = ex * Math.sin(orb.tilt) + ey * Math.cos(orb.tilt);
          const p = project(rx, ry, 0);
          const r = 3 + ni * 0.5;

          // Glow (reduced for subtle glow)
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
          grd.addColorStop(0, GREEN_A(0.3));
          grd.addColorStop(1, GREEN_A(0));
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = GREEN;
          ctx.fill();
        });
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <canvas ref={canvasRef} width={W} height={H} className="absolute inset-0" />
      {/* Central QX icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute rounded-full"
            style={{ width: 170, height: 170, border: '1px solid rgba(0, 199, 118, 0.08)', animation: 'ping 4s ease-out infinite' }} />
          <div className="absolute rounded-full"
            style={{ width: 142, height: 142, border: '1px solid rgba(0, 199, 118, 0.15)' }} />
          <div className="relative flex items-center justify-center rounded-full"
            style={{ width: 112, height: 112, background: 'rgba(0, 199, 118, 0.04)', border: '1.5px solid rgba(0, 199, 118, 0.20)' }}
          >
            {iconErr ? (
              <Shield className="w-12 h-12" style={{ color: 'var(--accent)' }} />
            ) : (
              <img src="/icons/qx-icon.png" alt="QX" className="object-contain rounded-xl"
                style={{ width: 76, height: 76 }} onError={() => setIconErr(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Mobile mini globe */
const OrbitalGlobeMini: React.FC = () => {
  const [iconErr, setIconErr] = useState(false);
  return (
    <div className="relative w-36 h-36">
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(0, 199, 118, 0.04) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 rounded-full"
        style={{ border: '1px solid rgba(0, 199, 118, 0.08)', animation: 'spin 60s linear infinite' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-full"
          style={{ width: 56, height: 56, background: 'rgba(0, 199, 118, 0.04)', border: '1.5px solid rgba(0, 199, 118, 0.18)' }}
        >
          {iconErr ? (
            <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          ) : (
            <img src="/icons/qx-icon.png" alt="QX" className="object-contain"
              style={{ width: 34, height: 34 }} onError={() => setIconErr(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
