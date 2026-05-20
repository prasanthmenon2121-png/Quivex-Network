import { motion } from 'framer-motion';
import { Shield, Fingerprint, WifiOff } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-5 z-20">
        {/* Logo - Desktop - SPYNEX Style */}
        <div className="hidden md:flex items-center gap-3">
          {/* Logo with arc */}
          <div className="relative">
            <img src="/icons/icon-192.png" alt="QuiVex" className="w-12 h-12 object-contain relative z-10" />
            {/* Arc behind logo */}
            <svg className="absolute -top-2 -left-2 w-16 h-16" viewBox="0 0 60 60">
              <path d="M 10 50 A 35 35 0 0 1 50 50" fill="none" stroke="#00FF7F" strokeWidth="1" opacity="0.4" />
              <path d="M 8 48 A 38 38 0 0 1 52 48" fill="none" stroke="#00FF7F" strokeWidth="0.5" opacity="0.2" />
            </svg>
            {/* Glow */}
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full -z-10" />
          </div>
          {/* Text */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-[26px] font-bold text-white tracking-[0.12em] leading-none" style={{ fontFamily: 'Rajdhani, sans-serif' }}>QUIVE</span>
              <span className="text-[26px] font-bold text-accent tracking-[0.12em] leading-none" style={{ fontFamily: 'Rajdhani, sans-serif' }}>X</span>
            </div>
            <span className="text-[8px] text-text-secondary tracking-[0.5em] uppercase mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SECRET PRIVACY NETWORK</span>
          </div>
        </div>
        <div className="md:hidden" />
        <button className="text-[12px] text-accent hover:text-white transition-colors flex items-center gap-1 font-medium">
          English <span className="text-accent">▼</span>
        </button>
      </header>

      {/* Globe - Right side on desktop, centered on mobile */}
      <div className="absolute inset-0 md:left-[40%] flex items-center justify-center md:justify-end md:pr-[-100px]">
        <div className="relative w-[380px] h-[380px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]">
          <svg className="w-full h-full" viewBox="0 0 500 500">
            <defs>
              <radialGradient id="sphereGrad" cx="40%" cy="40%">
                <stop offset="0%" stopColor="#0a140a" />
                <stop offset="100%" stopColor="#040804" />
              </radialGradient>
              <clipPath id="sphereClip">
                <circle cx="250" cy="250" r="155" />
              </clipPath>
            </defs>

            {/* Outer orbital rings - tilted ellipses */}
            <ellipse cx="250" cy="250" rx="240" ry="85" fill="none" stroke="#0d1a0d" strokeWidth="1" transform="rotate(-12 250 250)" />
            <ellipse cx="250" cy="250" rx="225" ry="75" fill="none" stroke="#0a140a" strokeWidth="0.7" transform="rotate(-12 250 250)" />

            {/* Second set of orbital rings - different angle */}
            <ellipse cx="250" cy="250" rx="235" ry="80" fill="none" stroke="#0a140a" strokeWidth="0.7" transform="rotate(20 250 250)" />
            <ellipse cx="250" cy="250" rx="220" ry="70" fill="none" stroke="#081008" strokeWidth="0.5" transform="rotate(20 250 250)" />

            {/* Main sphere */}
            <circle cx="250" cy="250" r="155" fill="url(#sphereGrad)" />

            {/* Globe grid lines inside sphere */}
            <g clipPath="url(#sphereClip)" opacity="0.4">
              {/* Latitude lines */}
              <ellipse cx="250" cy="250" rx="150" ry="25" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="150" ry="50" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="150" ry="75" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="150" ry="100" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="150" ry="125" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />

              {/* Longitude lines */}
              <ellipse cx="250" cy="250" rx="25" ry="150" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="50" ry="150" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="75" ry="150" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="100" ry="150" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
              <ellipse cx="250" cy="250" rx="125" ry="150" fill="none" stroke="#1a3a1a" strokeWidth="0.6" />
            </g>

            {/* Sphere border */}
            <circle cx="250" cy="250" r="155" fill="none" stroke="#1a3a1a" strokeWidth="1" />

            {/* Inner concentric circles */}
            <circle cx="250" cy="250" r="110" fill="none" stroke="#0d1a0d" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="75" fill="none" stroke="#0d1a0d" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="45" fill="none" stroke="#0d1a0d" strokeWidth="0.5" />

            {/* Center logo background */}
            <circle cx="250" cy="250" r="42" fill="#040804" stroke="#1a4a1a" strokeWidth="1.5" />
          </svg>

          {/* Logo in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/icons/icon-192.png"
              alt="QuiVex"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </div>

          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent/10 blur-3xl rounded-full" />
        </div>
      </div>

      {/* Mobile Bottom Content */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-6 pb-10">
        <div className="flex flex-col items-center mb-6">
          {/* SPYNEX Style Logo */}
          <div className="relative mb-4">
            <img src="/icons/icon-192.png" alt="QuiVex" className="w-16 h-16 object-contain relative z-10" />
            {/* Arc behind logo */}
            <svg className="absolute -top-3 -left-3 w-[88px] h-[88px]" viewBox="0 0 80 80">
              <path d="M 8 65 A 50 50 0 0 1 72 65" fill="none" stroke="#00FF7F" strokeWidth="1.5" opacity="0.5" />
              <path d="M 5 62 A 55 55 0 0 1 75 62" fill="none" stroke="#00FF7F" strokeWidth="0.8" opacity="0.25" />
              <path d="M 12 68 A 45 45 0 0 1 68 68" fill="none" stroke="#00FF7F" strokeWidth="0.5" opacity="0.3" />
            </svg>
            {/* Glow */}
            <div className="absolute inset-0 bg-accent/25 blur-2xl rounded-full -z-10" />
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-[36px] font-bold text-white tracking-[0.1em] leading-none" style={{ fontFamily: 'Rajdhani, sans-serif' }}>QUIVE</span>
            <span className="text-[36px] font-bold text-accent tracking-[0.1em] leading-none" style={{ fontFamily: 'Rajdhani, sans-serif' }}>X</span>
          </div>
          <span className="text-[9px] text-text-secondary tracking-[0.45em] uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SECRET PRIVACY NETWORK</span>
        </div>
        <div className="flex items-center gap-3 mb-5 w-full max-w-[300px]">
          <motion.button
            onClick={onGetStarted}
            whileTap={{ scale: 0.97 }}
            className="flex-1 h-[48px] rounded-full text-[14px] font-semibold"
            style={{ backgroundColor: '#00FF7F', color: '#060A06', boxShadow: '0 0 8px rgba(0,255,127,0.4)' }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex-1 h-[48px] rounded-full text-[14px] font-medium transition-colors"
            style={{ border: '1.5px solid rgba(0,255,127,0.2)', color: '#F0F7F0', backgroundColor: 'transparent' }}
          >
            I have an account
          </motion.button>
        </div>
        <p className="text-[11px] text-text-secondary">Fast. Fluid. <span className="text-accent underline">Private.</span></p>
      </div>

      {/* Desktop Left Content */}
      <div className="hidden md:flex absolute inset-y-0 left-0 w-[45%] z-10 flex-col justify-center px-10 lg:px-16">
        {/* Tagline */}
        <h1 className="mb-5">
          <span className="block text-[36px] lg:text-[44px] font-bold text-white leading-[1.1] italic">Private</span>
          <span className="block text-[36px] lg:text-[44px] font-bold text-white leading-[1.1] italic">communication.</span>
          <span className="block text-[36px] lg:text-[44px] font-bold text-accent leading-[1.1] italic">Reimagined.</span>
        </h1>

        {/* Description */}
        <p className="text-[13px] text-text-secondary max-w-[300px] mb-6 leading-relaxed">
          End-to-end encrypted messaging, calls,<br />
          and media sharing for a private world.
        </p>

        {/* Features */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-accent/40 bg-accent/5">
            <Shield size={14} className="text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-medium leading-tight">E2E Encrypted</span>
              <span className="text-[8px] text-text-secondary leading-tight">Always secure</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#1a2a1a]">
            <Fingerprint size={14} className="text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-medium leading-tight">Private Identity</span>
              <span className="text-[8px] text-text-secondary leading-tight">Stay anonymous</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#1a2a1a]">
            <WifiOff size={14} className="text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-medium leading-tight">Offline First</span>
              <span className="text-[8px] text-text-secondary leading-tight">Works anywhere</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mb-5">
          <motion.button
            onClick={onGetStarted}
            whileTap={{ scale: 0.97 }}
            className="h-[48px] px-8 rounded-full text-[14px] font-semibold transition-colors"
            style={{ backgroundColor: '#00FF7F', color: '#060A06', boxShadow: '0 0 8px rgba(0,255,127,0.4)' }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="h-[48px] px-7 rounded-full text-[14px] font-medium transition-colors"
            style={{ border: '1.5px solid rgba(0,255,127,0.2)', color: '#F0F7F0', backgroundColor: 'transparent' }}
          >
            I have an account
          </motion.button>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-text-secondary">Fast. Fluid. <span className="text-accent font-medium underline underline-offset-2">Private.</span></p>
      </div>
    </div>
  );
};
