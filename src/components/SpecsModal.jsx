import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { Swords, Zap, Fingerprint, Shield, Move } from 'lucide-react';

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
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505] overflow-y-auto"
        >
          {/* Top Navbar */}
          <div className="flex justify-between items-start p-6 md:p-10 relative z-20">
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-display text-xl tracking-widest uppercase">Cyber Katana X-01</h2>
              <p className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase">Technical Specifications</p>
            </div>

            <button 
              onClick={handleClose}
              onMouseEnter={playHover}
              className="group flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-white/30 transition-colors bg-white/5"
            >
              <span className="text-white text-[10px] font-mono tracking-widest uppercase transition-colors">Close</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-6 pb-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10">
            
            {/* Left: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 w-full flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06),transparent_60%)]" />
              <img 
                src={`${import.meta.env.BASE_URL}katanas/x01-crimson-red.webp`}
                alt="Cyber Katana X-01" 
                className="w-full max-w-md lg:max-w-xl h-auto object-contain relative z-10 mix-blend-screen opacity-90" 
              />
            </motion.div>

            {/* Right: Specs List */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-1 w-full max-w-md flex flex-col gap-10"
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl md:text-5xl font-display text-white tracking-widest uppercase">Engineered Details</h1>
                <p className="text-white/50 text-sm font-mono tracking-[0.05em] leading-relaxed">
                  A perfect blend of traditional design and modern technology. Built for precision and maximum durability.
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                <SpecItem icon={<Swords size={20} />} title="Blade Material" desc="Plasma Alloy" />
                <SpecItem icon={<Zap size={20} />} title="Plasma Edge" desc="Redline Conduit" />
                <SpecItem icon={<Fingerprint size={20} />} title="Grip System" desc="Silent Neuro-Wrap" />
                <SpecItem icon={<Shield size={20} />} title="Sheath Tech" desc="Mag-Lock Zero Draw" />
                <SpecItem icon={<Move size={20} />} title="Dimensions" desc="73cm (Blade Length)" />
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecItem({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="text-white/20 group-hover:text-red-500 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">{title}</span>
        <span className="text-white/90 font-mono text-xs tracking-widest uppercase">{desc}</span>
      </div>
    </div>
  );
}
