import React from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';
import { audio } from '../utils/AudioEngine';

export default function ScrollStages({ scrollYProgress }) {
  const prevScroll = React.useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const prev = prevScroll.current;
    
    // Trigger sounds exactly when crossing the threshold going downwards
    if (prev <= 0.05 && latest > 0.05) audio.playShing();
    if (prev <= 0.20 && latest > 0.20) audio.playWhoosh();
    if (prev <= 0.25 && latest > 0.25) audio.playBladeGlide();
    
    if (prev <= 0.40 && latest > 0.40) audio.playPulse();
    if (prev <= 0.42 && latest > 0.42) audio.playPulse();
    if (prev <= 0.44 && latest > 0.44) audio.playPulse();
    if (prev <= 0.46 && latest > 0.46) audio.playPulse();
    
    if (prev <= 0.60 && latest > 0.60) audio.playResheath();
    if (prev <= 0.80 && latest > 0.80) audio.playWhoosh();
    if (prev <= 0.83 && latest > 0.83) audio.playImpact();
    
    prevScroll.current = latest;
  });

  // Stage 1: Hero (0% - 20%)
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroTypewriter = useTransform(scrollYProgress, [0, 0.1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const stage1Display = useTransform(scrollYProgress, [0, 0.19, 0.2], ["flex", "flex", "none"]);

  // Stage 2: Approach (20% - 40%)
  const stage2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const stage2X = useTransform(scrollYProgress, [0.2, 0.25], [50, 0]);
  const stage2Display = useTransform(scrollYProgress, [0.19, 0.2, 0.4, 0.41], ["none", "flex", "flex", "none"]);

  // Stage 3: Flash (40% - 60%)
  const stage3Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const stage3Scale = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.95, 1, 0.95]);
  const stage3Display = useTransform(scrollYProgress, [0.39, 0.4, 0.6, 0.61], ["none", "block", "block", "none"]);
  
  // Typewriter clips for HUD elements
  const hudClip1 = useTransform(scrollYProgress, [0.4, 0.43], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const hudClip2 = useTransform(scrollYProgress, [0.42, 0.45], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const hudClip3 = useTransform(scrollYProgress, [0.44, 0.47], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const hudClip4 = useTransform(scrollYProgress, [0.46, 0.49], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  // Stage 4: Return (60% - 80%)
  const stage4Opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const stage4Y = useTransform(scrollYProgress, [0.6, 0.65], [50, 0]);
  const stage4Display = useTransform(scrollYProgress, [0.59, 0.6, 0.8, 0.81], ["none", "flex", "flex", "none"]);

  // Stage 5: Final Buy (80% - 100%) - Stays visible permanently at the end
  const stage5Opacity = useTransform(scrollYProgress, [0.8, 0.85, 1.0], [0, 1, 1]);
  const stage5Y = useTransform(scrollYProgress, [0.8, 0.85, 1.0], [50, 0, 0]);
  const stage5Display = useTransform(scrollYProgress, [0.79, 0.8, 1.0], ["none", "flex", "flex"]);

  return (
    <div className="absolute top-0 left-0 w-full h-[100dvh] z-30">
      
      {/* STAGE 1: Hero */}
      <motion.div 
        style={{ opacity: stage1Opacity, y: stage1Y, display: stage1Display }}
        className="absolute top-0 left-0 w-full h-[100dvh] flex flex-col justify-start pt-24 md:pt-0 md:justify-center px-8 md:px-16"
      >
        <div className="md:w-1/3 lg:w-1/4 flex flex-col items-start gap-4">
          <span className="text-red-500 font-mono text-xs tracking-[0.3em]">CYBER KATANA // X-01</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-white leading-tight">Forged for <br/>silent <span className="text-red-600">impact.</span></h1>
          
          <div className="border-l-2 border-red-600 pl-3 inline-block">
            <motion.p 
              style={{ clipPath: heroTypewriter }}
              className="text-neutral-400 font-mono text-sm whitespace-nowrap"
            >
              Initializing blade core...
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full md:w-auto">
            <button 
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => audio.playBeep()}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              Buy Now
            </button>
            <button 
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => audio.playBeep()}
              className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-bold uppercase tracking-widest text-xs transition-colors bg-black/40 backdrop-blur-sm"
            >
              View Specs
            </button>
          </div>
        </div>
      </motion.div>

      {/* STAGE 2: Approach */}
      <motion.div 
        style={{ opacity: stage2Opacity, x: stage2X, display: stage2Display }}
        className="absolute top-0 right-0 w-full h-[100dvh] flex flex-col justify-end pb-32 md:pb-0 md:justify-center items-end px-8 md:px-16"
      >
        <div className="w-full sm:w-2/3 md:w-1/3 lg:w-1/4 flex flex-col gap-6 items-end text-right">
          <div onMouseEnter={() => audio.playGlassTap()} className="bg-black/50 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-colors p-6 rounded-xl w-full cursor-default">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-red-500">Grip</h3>
            <p className="text-white text-lg font-bold uppercase tracking-wide mb-1">Carbon-Forged</p>
            <p className="text-neutral-400 text-xs tracking-wider">Engineered for absolute control.</p>
          </div>
          <div onMouseEnter={() => audio.playGlassTap()} className="bg-black/50 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-colors p-6 rounded-xl w-full cursor-default">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-red-500">Sheath</h3>
            <p className="text-white text-lg font-bold uppercase tracking-wide mb-1">Titanium Cyber</p>
            <p className="text-neutral-400 text-xs tracking-wider">Magnetic lock with instant release.</p>
          </div>
          <div onMouseEnter={() => audio.playGlassTap()} className="bg-black/50 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-colors p-6 rounded-xl w-full cursor-default">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-red-500">Balance</h3>
            <p className="text-white text-lg font-bold uppercase tracking-wide mb-1">Precision Tuned</p>
            <p className="text-neutral-400 text-xs tracking-wider">Perfect weight distribution.</p>
          </div>
        </div>
      </motion.div>

      {/* STAGE 3: Flash */}
      <motion.div 
        style={{ opacity: stage3Opacity, scale: stage3Scale, display: stage3Display }}
        className="absolute top-0 left-0 w-full h-[100dvh]"
      >
        <div className="absolute top-24 left-8 md:top-12 md:left-12 border-l-2 border-t-2 border-red-500/50 p-3 bg-red-900/10 backdrop-blur-sm">
          <motion.div style={{ clipPath: hudClip1 }} className="whitespace-nowrap">
            <span className="text-red-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Plasma edge stabilized</span>
          </motion.div>
        </div>
        <div className="absolute bottom-24 right-8 md:bottom-32 md:right-12 border-r-2 border-b-2 border-red-500/50 p-3 bg-red-900/10 backdrop-blur-sm text-right flex justify-end">
          <motion.div style={{ clipPath: hudClip2 }} className="whitespace-nowrap">
            <span className="text-red-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Motion core active</span>
          </motion.div>
        </div>
        <div className="absolute top-24 right-8 md:top-12 md:right-12 border-r-2 border-t-2 border-red-500/50 p-3 bg-red-900/10 backdrop-blur-sm text-right flex justify-end">
          <motion.div style={{ clipPath: hudClip3 }} className="whitespace-nowrap">
            <span className="text-red-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Target locked</span>
          </motion.div>
        </div>
        <div className="absolute bottom-24 left-8 md:bottom-32 md:left-12 border-l-2 border-b-2 border-red-500/50 p-3 bg-red-900/10 backdrop-blur-sm">
          <motion.div style={{ clipPath: hudClip4 }} className="whitespace-nowrap">
            <span className="text-red-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Silent strike mode</span>
          </motion.div>
        </div>
      </motion.div>

      {/* STAGE 4: Return */}
      <motion.div 
        style={{ opacity: stage4Opacity, y: stage4Y, display: stage4Display }}
        className="absolute top-0 left-0 w-full h-[100dvh] flex flex-col justify-start items-start px-8 md:px-16 pt-4 md:pt-8"
      >
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-2 bg-black/60 backdrop-blur-xl border border-red-900/50 p-8 rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-red-500 font-mono text-xs tracking-[0.2em] uppercase">SPECS</h2>
          </div>
          
          <div className="flex justify-between border-b border-white/5 pb-3">
            <span className="text-neutral-500 font-mono text-xs tracking-wider">Material</span>
            <span className="text-white font-mono text-xs uppercase tracking-wider">Titanium alloy</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-3 pt-3">
            <span className="text-neutral-500 font-mono text-xs tracking-wider">Edge</span>
            <span className="text-white font-mono text-xs uppercase tracking-wider">Neon plasma finish</span>
          </div>
          <div className="flex justify-between pt-3">
            <span className="text-neutral-500 font-mono text-xs tracking-wider">Edition</span>
            <span className="text-red-400 font-mono text-xs uppercase tracking-wider font-bold">Limited cyber series</span>
          </div>
        </div>
      </motion.div>

      {/* STAGE 5: Final Buy */}
      <motion.div 
        style={{ opacity: stage5Opacity, y: stage5Y, display: stage5Display }}
        className="absolute bottom-0 left-0 w-full h-[100dvh] flex flex-col justify-end items-end pb-4 md:pb-6 px-8 md:px-16"
      >
        <div className="w-full max-w-sm bg-black/80 backdrop-blur-2xl border border-red-600/30 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mb-2">Cyber Katana X-01</h2>
          <p className="text-red-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] mb-6">LIMITED COLLECTOR EDITION</p>
          
          <div className="text-3xl font-light text-white mb-6 tracking-widest">$2,499<span className="text-lg text-neutral-500">.00</span></div>
          
          <button 
            onMouseEnter={() => audio.playGlassTap()}
            onClick={() => audio.playBeep()}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs transition-colors mb-3 relative group overflow-hidden"
          >
            <span className="relative z-10">Buy Now</span>
            <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          </button>
          
          <button 
            onMouseEnter={() => audio.playGlassTap()}
            onClick={() => audio.playBeep()}
            className="w-full py-3 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            Contact Studio
          </button>
        </div>
      </motion.div>

    </div>
  );
}
