import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { ChevronLeft, ChevronRight, Swords, Zap, Fingerprint, Shield, Move } from 'lucide-react';

export default function SpecsModal({ isOpen, onClose }) {
  const handleClose = () => {
    audio.playBeep();
    onClose();
  };

  const playHover = () => audio.playGlassTap();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050914]" // Deep navy/black cyber background
        >
          {/* Background Grid & HUD Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#02040a_100%)] pointer-events-none" />

          {/* Top Navbar */}
          <div className="flex justify-between items-start p-8 relative z-20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-red-500/50 flex items-center justify-center rotate-45">
                  <div className="w-3 h-3 bg-red-500" />
                </div>
                <h2 className="text-white font-bold tracking-[0.2em] uppercase text-lg">Cyber Katana X-01</h2>
              </div>
              <p className="text-red-500 text-[10px] font-mono tracking-[0.3em] uppercase ml-11">Limited Collector Edition</p>
            </div>

            <button 
              onClick={handleClose}
              onMouseEnter={playHover}
              className="group flex items-center gap-4 px-6 py-3 border border-white/10 hover:border-red-500/50 transition-colors bg-black/40 backdrop-blur-md"
            >
              <span className="text-white text-xs font-mono tracking-[0.2em] uppercase group-hover:text-red-400 transition-colors">Back to Overview</span>
              <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 transition-transform" />
            </button>
          </div>

          {/* Main Title */}
          <div className="text-center mt-2 relative z-20 flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-widest uppercase mb-2">View Specs</h1>
            <p className="text-red-500 text-xs font-mono tracking-[0.3em] uppercase">Explore the engineered details</p>
            <div className="w-2 h-2 border border-red-500 rotate-45 mt-4" />
          </div>

          {/* Carousel Area */}
          <div className="flex-1 w-full flex items-center justify-center px-4 relative z-10 -mt-8">
            
            {/* Left Arrow */}
            <button onMouseEnter={playHover} className="absolute left-8 w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-white hover:bg-red-900/40 hover:border-red-500 transition-all z-30">
              <ChevronLeft size={20} />
            </button>

            {/* Grid Container */}
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-[1600px] w-full">
              
              {/* Card 1: Blade Core */}
              <div className="hidden xl:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group">
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Blade Core</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">Aurora-X Titanium</p>
                <div className="w-full h-[250px] bg-gradient-to-br from-neutral-800 to-black border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  High-frequency forged titanium alloy with plasma-infused edge channel for maximum durability and heat efficiency.
                </p>
              </div>

              {/* Card 2: Grip System */}
              <div className="hidden lg:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group">
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Grip System</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">Neuro-Wrap</p>
                <div className="w-full h-[250px] bg-gradient-to-bl from-neutral-800 to-black border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  Adaptive neuro-material wrap for enhanced tactile feedback, silent handling, and absolute control.
                </p>
              </div>

              {/* CENTER CARD: Primary System */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="w-full max-w-[500px] h-[650px] bg-black/60 backdrop-blur-md relative p-8 flex flex-col shadow-[0_0_50px_rgba(220,38,38,0.15)]"
              >
                {/* Glowing Red Border Box */}
                <div className="absolute inset-0 border-2 border-red-600 rounded-lg pointer-events-none" />
                <div className="absolute inset-0 border-[4px] border-red-500 blur-[8px] opacity-50 rounded-lg pointer-events-none" />
                
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Cyber Katana X-01</h3>
                <p className="text-red-500 border border-red-500/30 inline-block px-2 py-1 text-[9px] font-mono tracking-widest uppercase mb-8 self-start bg-red-950/30">Primary System</p>
                
                {/* Main Katana Hero Area */}
                <div className="w-full h-[220px] flex items-center justify-center relative mb-8">
                  {/* Glowing background blob */}
                  <div className="absolute w-[80%] h-[40%] bg-red-600/30 blur-[40px] rounded-full rotate-12" />
                  {/* Using the frame image for the center representation */}
                  <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Cyber Katana" className="w-[120%] h-auto object-cover scale-150 rotate-[25deg] mix-blend-screen relative z-10 filter contrast-125 saturate-150" />
                </div>

                {/* Specs List */}
                <div className="flex-1 flex flex-col justify-center gap-4 px-4">
                  <SpecItem icon={<Swords size={18} />} title="Blade Material" desc="Aurora-X Titanium Alloy" />
                  <SpecItem icon={<Zap size={18} />} title="Plasma Edge" desc="Redline Plasma Conduit" />
                  <SpecItem icon={<Fingerprint size={18} />} title="Grip System" desc="Neuro-Wrap Silent Grip" />
                  <SpecItem icon={<Shield size={18} />} title="Sheath Tech" desc="Mag-Lock Zero Draw" />
                  <SpecItem icon={<Move size={18} />} title="Dimensions" desc="1020mm / 40.2in (Overall)" />
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center border-t border-red-900/50">
                  <span className="text-red-600 font-mono text-[9px] tracking-widest">SERIAL: X01-7K22-LCE</span>
                  <span className="text-red-500 font-mono text-[9px] tracking-widest">CLASS: COVERT</span>
                </div>
              </motion.div>

              {/* Card 4: Tsuba Unit */}
              <div className="hidden lg:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group">
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Tsuba Unit</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">Vector Guard</p>
                <div className="w-full h-[250px] bg-gradient-to-tr from-neutral-800 to-black border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  Aerodynamic vector guard optimized for deflection, balance, and close-quarters maneuverability.
                </p>
              </div>

              {/* Card 5: Sheath System */}
              <div className="hidden xl:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group">
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Sheath System</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">Mag-Lock Zero Draw</p>
                <div className="w-full h-[250px] bg-gradient-to-tl from-neutral-800 to-black border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  Magnetic lock sheath with zero-draw resistance and motion-stabilized lining for ultra-fast deployment and secure carry.
                </p>
              </div>

            </div>

            {/* Right Arrow */}
            <button onMouseEnter={playHover} className="absolute right-8 w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-white hover:bg-red-900/40 hover:border-red-500 transition-all z-30">
              <ChevronRight size={20} />
            </button>
            
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 pb-8 relative z-20">
            <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full cursor-pointer hover:bg-white transition-colors" />
            <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full cursor-pointer hover:bg-white transition-colors" />
            <div className="w-2 h-2 bg-red-500 rotate-45" /> {/* Active dot */}
            <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full cursor-pointer hover:bg-white transition-colors" />
            <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full cursor-pointer hover:bg-white transition-colors" />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small component for the corner L-brackets on side cards
function CornerAccents() {
  return (
    <>
      <div className="absolute top-4 left-4 w-2 h-[1px] bg-white/30" />
      <div className="absolute top-4 left-4 w-[1px] h-2 bg-white/30" />
      
      <div className="absolute top-4 right-4 w-2 h-[1px] bg-white/30" />
      <div className="absolute top-4 right-4 w-[1px] h-2 bg-white/30 right-0 transform -translate-x-[7px]" />
      
      <div className="absolute bottom-4 left-4 w-2 h-[1px] bg-white/30" />
      <div className="absolute bottom-4 left-4 w-[1px] h-2 bg-white/30 transform -translate-y-[7px]" />
      
      <div className="absolute bottom-4 right-4 w-2 h-[1px] bg-white/30" />
      <div className="absolute bottom-4 right-4 w-[1px] h-2 bg-white/30 transform -translate-x-[7px] -translate-y-[7px]" />
    </>
  );
}

function SpecItem({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-neutral-500 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-mono text-[10px] tracking-widest uppercase">{title}</span>
        <span className="text-neutral-400 font-mono text-[9px] tracking-widest uppercase">{desc}</span>
      </div>
    </div>
  );
}
