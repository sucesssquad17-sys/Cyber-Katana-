import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { ChevronLeft, ChevronRight, Swords, Zap, Fingerprint, Shield, Move } from 'lucide-react';

const SPECS_DATA = [
  { 
    id: 0, 
    title: 'Blade Core', 
    subtitle: 'Aurora-X Titanium', 
    isMain: false, 
    bg: "bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]", 
    gradient: "from-neutral-800 to-black",
    desc: 'High-frequency forged titanium alloy with plasma-infused edge channel for maximum durability and heat efficiency.' 
  },
  { 
    id: 1, 
    title: 'Grip System', 
    subtitle: 'Neuro-Wrap', 
    isMain: false, 
    bg: "bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]", 
    gradient: "from-neutral-800 to-black",
    desc: 'Adaptive neuro-material wrap for enhanced tactile feedback, silent handling, and absolute control.' 
  },
  { 
    id: 2, 
    title: 'Cyber Katana X-01', 
    subtitle: 'Primary System', 
    isMain: true 
  },
  { 
    id: 3, 
    title: 'Tsuba Unit', 
    subtitle: 'Vector Guard', 
    isMain: false, 
    bg: "bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]", 
    gradient: "from-neutral-800 to-black",
    desc: 'Aerodynamic vector guard optimized for deflection, balance, and close-quarters maneuverability.' 
  },
  { 
    id: 4, 
    title: 'Sheath System', 
    subtitle: 'Mag-Lock Zero Draw', 
    isMain: false, 
    bg: "bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]", 
    gradient: "from-neutral-800 to-black",
    desc: 'Magnetic lock sheath with zero-draw resistance and motion-stabilized lining for ultra-fast deployment and secure carry.' 
  }
];

export default function SpecsModal({ isOpen, onClose }) {
  const [offset, setOffset] = useState(2); // Start with Katana in center

  const handleClose = () => {
    audio.playBeep();
    onClose();
  };

  const playHover = () => audio.playGlassTap();

  const nextSlide = () => {
    audio.playGlassTap();
    setOffset((prev) => prev + 1);
  };

  const prevSlide = () => {
    audio.playGlassTap();
    setOffset((prev) => prev - 1);
  };

  const getItem = (relativeIndex) => {
    const len = SPECS_DATA.length;
    const index = (((offset + relativeIndex) % len) + len) % len;
    return SPECS_DATA[index];
  };

  const farLeft = getItem(-2);
  const midLeft = getItem(-1);
  const center = getItem(0);
  const midRight = getItem(1);
  const farRight = getItem(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050914] overflow-hidden"
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
            <button onClick={prevSlide} onMouseEnter={playHover} className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-white hover:bg-red-900/40 hover:border-red-500 transition-all z-30 bg-black/50 backdrop-blur-sm">
              <ChevronLeft size={20} />
            </button>

            {/* Grid Container */}
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-[1600px] w-full">
              
              {/* Card 1: Far Left */}
              <div className="hidden xl:flex flex-col w-[250px] h-[500px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group cursor-pointer" onClick={prevSlide}>
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">{farLeft.title}</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">{farLeft.subtitle}</p>
                <div className={`w-full h-[220px] bg-gradient-to-br ${farLeft.gradient || 'from-neutral-800 to-black'} border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors flex items-center justify-center`}>
                  {farLeft.isMain ? (
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[120%] h-auto object-cover -rotate-45 pb-8 mix-blend-screen opacity-50" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 opacity-20 ${farLeft.bg}`} />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[200%] h-auto object-cover -rotate-12 pb-8 mix-blend-screen opacity-30 filter grayscale" />
                    </>
                  )}
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  {farLeft.desc || 'Primary asset module loading...'}
                </p>
              </div>

              {/* Card 2: Mid Left */}
              <div className="hidden lg:flex flex-col w-[250px] h-[500px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group cursor-pointer" onClick={prevSlide}>
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">{midLeft.title}</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">{midLeft.subtitle}</p>
                <div className={`w-full h-[220px] bg-gradient-to-br ${midLeft.gradient || 'from-neutral-800 to-black'} border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors flex items-center justify-center`}>
                  {midLeft.isMain ? (
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[120%] h-auto object-cover -rotate-45 pb-8 mix-blend-screen opacity-50" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 opacity-20 ${midLeft.bg}`} />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[200%] h-auto object-cover -rotate-12 pb-8 mix-blend-screen opacity-30 filter grayscale" />
                    </>
                  )}
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  {midLeft.desc || 'Primary asset module loading...'}
                </p>
              </div>

              {/* CENTER CARD: Primary System */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="w-[90vw] max-w-[450px] h-auto min-h-[610px] bg-black/60 backdrop-blur-md relative p-6 pb-20 flex flex-col shadow-[0_0_50px_rgba(220,38,38,0.15)]"
              >
                {/* Red Border Box */}
                <div className="absolute inset-0 border-2 border-red-600 rounded-lg pointer-events-none" />
                
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">{center.title}</h3>
                <p className="text-red-500 border border-red-500/30 inline-block px-2 py-1 text-[9px] font-mono tracking-widest uppercase mb-4 self-start bg-red-950/30">{center.subtitle}</p>
                
                {/* Main Katana Hero Area */}
                <div className="w-full h-[180px] flex items-center justify-center relative mb-4 border-b border-white/10 pb-4 overflow-hidden">
                  {center.isMain ? (
                    <>
                      <div className="absolute w-[80%] h-[40%] bg-red-600/30 blur-[40px] rounded-full rotate-12" />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Cyber Katana" className="w-[120%] h-auto object-cover scale-150 rotate-[25deg] pb-8 mix-blend-screen relative z-10 filter contrast-125 saturate-150" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 opacity-40 ${center.bg || "bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"}`} />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Cyber Katana" className="w-[150%] h-auto object-cover scale-150 rotate-[25deg] pb-8 mix-blend-screen relative z-10 filter grayscale opacity-40" />
                    </>
                  )}
                </div>

                {/* Specs List */}
                <div className="flex-1 flex flex-col justify-center gap-3 px-4 pb-12">
                  {center.isMain ? (
                    <>
                      <SpecItem icon={<Swords size={18} />} title="Blade Material" desc="Aurora-X Titanium Alloy" />
                      <SpecItem icon={<Zap size={18} />} title="Plasma Edge" desc="Redline Plasma Conduit" />
                      <SpecItem icon={<Fingerprint size={18} />} title="Grip System" desc="Neuro-Wrap Silent Grip" />
                      <SpecItem icon={<Shield size={18} />} title="Sheath Tech" desc="Mag-Lock Zero Draw" />
                      <SpecItem icon={<Move size={18} />} title="Dimensions" desc="1020mm / 40.2in (Overall)" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center p-4">
                      <p className="text-neutral-400 font-mono text-xs leading-relaxed uppercase tracking-widest">{center.desc}</p>
                    </div>
                  )}
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center border-t border-red-900/50">
                  <span className="text-red-600 font-mono text-[9px] tracking-widest">SERIAL: X01-7K22-LCE</span>
                  <span className="text-red-500 font-mono text-[9px] tracking-widest">CLASS: COVERT</span>
                </div>
              </motion.div>

              {/* Card 4: Mid Right */}
              <div className="hidden lg:flex flex-col w-[250px] h-[500px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group cursor-pointer" onClick={nextSlide}>
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">{midRight.title}</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">{midRight.subtitle}</p>
                <div className={`w-full h-[220px] bg-gradient-to-br ${midRight.gradient || 'from-neutral-800 to-black'} border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors flex items-center justify-center`}>
                  {midRight.isMain ? (
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[120%] h-auto object-cover -rotate-45 pb-8 mix-blend-screen opacity-50" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 opacity-20 ${midRight.bg}`} />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[200%] h-auto object-cover -rotate-12 pb-8 mix-blend-screen opacity-30 filter grayscale" />
                    </>
                  )}
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  {midRight.desc || 'Primary asset module loading...'}
                </p>
              </div>

              {/* Card 5: Far Right */}
              <div className="hidden xl:flex flex-col w-[250px] h-[500px] bg-black/40 border border-white/5 backdrop-blur-sm relative p-6 transition-transform hover:-translate-y-2 group cursor-pointer" onClick={nextSlide}>
                <CornerAccents />
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">{farRight.title}</h3>
                <p className="text-red-500 text-[9px] font-mono tracking-widest uppercase mb-6">{farRight.subtitle}</p>
                <div className={`w-full h-[220px] bg-gradient-to-br ${farRight.gradient || 'from-neutral-800 to-black'} border border-white/10 mb-6 relative overflow-hidden group-hover:border-red-500/30 transition-colors flex items-center justify-center`}>
                  {farRight.isMain ? (
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[120%] h-auto object-cover -rotate-45 pb-8 mix-blend-screen opacity-50" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 opacity-20 ${farRight.bg}`} />
                      <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[200%] h-auto object-cover -rotate-12 pb-8 mix-blend-screen opacity-30 filter grayscale" />
                    </>
                  )}
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed tracking-wide">
                  {farRight.desc || 'Primary asset module loading...'}
                </p>
              </div>

            </div>

            {/* Right Arrow */}
            <button onClick={nextSlide} onMouseEnter={playHover} className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-white hover:bg-red-900/40 hover:border-red-500 transition-all z-30 bg-black/50 backdrop-blur-sm">
              <ChevronRight size={20} />
            </button>
            
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 pb-8 relative z-20">
            {SPECS_DATA.map((_, index) => {
              const isActive = (((offset) % SPECS_DATA.length) + SPECS_DATA.length) % SPECS_DATA.length === index;
              return (
                <div 
                  key={index}
                  className={`cursor-pointer transition-all ${isActive ? 'w-2 h-2 bg-red-500 rotate-45' : 'w-1.5 h-1.5 bg-neutral-600 rounded-full hover:bg-white'}`} 
                />
              );
            })}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
