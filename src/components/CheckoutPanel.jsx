import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { ShieldCheck, CheckCircle2, X, Shield, AlertTriangle } from 'lucide-react';
import { KATANAS } from '../utils/katanasData';

export default function CheckoutPanel({ isOpen, onClose, selectedKatanaId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeId, setActiveId] = useState(selectedKatanaId || 'X-09');


  const activeKatana = KATANAS.find(k => k.id === activeId) || KATANAS[0];

  const handleClose = useCallback(() => {
    audio.playBeep();
    onClose();
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(false);
    }, 500);
  }, [onClose]);

  // Escape key close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Browser back button behavior (popstate)
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      // Back button was pressed, close modal
      onClose();
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(false);
      }, 500);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  const handleReserve = () => {
    audio.playBeep();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      audio.playImpact();
    }, 1800);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const playHover = () => audio.playGlassTap();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6 overflow-y-auto"
        >
          {/* Subtle grid pattern for visual premium feel */}
          <div className="hud-grid absolute inset-0 opacity-20 pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-neutral-950/95 border border-white/10 rounded-2xl w-full max-w-5xl h-auto max-h-[92vh] md:max-h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] z-10 pointer-events-auto"
          >
            {/* Header / Top Right Close - Sticky and highly visible */}
            <button
              onClick={handleClose}
              onMouseEnter={playHover}
              className="absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 hover:border-white/30 bg-black/60 text-white/60 hover:text-white transition-all text-xs font-mono uppercase tracking-wider min-h-[40px]"
              aria-label="Close panel"
            >
              <span>Close</span>
              <X size={14} />
            </button>

            {/* Left Column: Image Display (Sticky at top on mobile) */}
            <div
              className="w-full md:w-[45%] bg-black/55 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden shrink-0"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(${activeKatana.accent}, 0.15), transparent 60%)`,
              }}
            >
              {/* Variant Selector at the top of image column */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Model ID</span>
                <span className="font-mono text-xs font-bold text-white bg-black/50 border border-white/10 px-2 py-0.5 rounded">
                  {activeKatana.id}
                </span>
              </div>

              <div className="relative w-full aspect-square md:h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeKatana.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                    transition={{ duration: 0.35 }}
                    src={`${import.meta.env.BASE_URL}${activeKatana.src}`}
                    alt={activeKatana.name}
                    className="w-full max-w-[280px] md:max-w-[340px] h-auto object-contain mix-blend-screen select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  />
                </AnimatePresence>
              </div>

              {/* Rarity & Accent Line */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">Rarity Class</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: `rgb(${activeKatana.accent})` }}>
                  {activeKatana.class}
                </span>
              </div>
            </div>

            {/* Right Column: Scrollable Details & Reservation */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col justify-between">
              {!isSuccess ? (
                <div className="flex flex-col gap-6">
                  {/* Title & Price */}
                  <div className="flex flex-col gap-1.5 border-b border-white/10 pb-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-500">{activeKatana.series}</span>
                    <h1 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-white">{activeKatana.name}</h1>
                    <div className="text-xl md:text-2xl font-mono text-white mt-1" style={{ color: `rgb(${activeKatana.accent})` }}>
                      {activeKatana.price} <span className="text-[10px] text-white/40 uppercase tracking-widest">credits</span>
                    </div>
                  </div>

                  {/* Switch Model Quick Bar */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Switch Model</label>
                    <div className="flex flex-wrap gap-1.5">
                      {KATANAS.map((k) => (
                        <button
                          key={k.id}
                          onClick={() => {
                            audio.playGlassTap();
                            setActiveId(k.id);
                          }}
                          className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded border transition-all ${
                            activeId === k.id
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/40 hover:text-white/80 hover:border-white/20'
                          }`}
                        >
                          {k.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                      <Shield size={12} className="text-white/40" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Spec Matrix</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                      <div>
                        <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.1em]">Blade Length</span>
                        <span className="font-mono text-white/85">{activeKatana.specs.bladeLength}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.1em]">Core Material</span>
                        <span className="font-mono text-white/85 truncate block">{activeKatana.specs.coreMaterial}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.1em]">Total Weight</span>
                        <span className="font-mono text-white/85">{activeKatana.specs.weight}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.1em]">Edge Physics</span>
                        <span className="font-mono text-white/85 truncate block">{activeKatana.specs.edgeType}</span>
                      </div>
                      <div className="col-span-2 border-t border-white/5 pt-2">
                        <span className="block font-mono text-[8px] text-white/30 uppercase tracking-[0.1em]">Special Ability</span>
                        <span className="text-white/80 leading-relaxed block">{activeKatana.specs.specialAbility}</span>
                      </div>
                      <div className="col-span-2 border-t border-white/5 pt-2">
                        <span className="block font-mono text-[8px] text-red-500/50 uppercase tracking-[0.1em]">Core Weakness</span>
                        <span className="text-white/60 leading-relaxed block">{activeKatana.specs.weakness}</span>
                      </div>
                    </div>
                  </div>

                  {/* Origin Lore */}
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Blade Origin & Lore</span>
                    <p className="text-white/60 leading-relaxed italic">{activeKatana.lore}</p>
                  </div>

                  {/* Included Items */}
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-1">Included Gear</span>
                      <ul className="list-disc list-inside text-white/60 space-y-0.5">
                        {activeKatana.included.map((item, idx) => (
                          <li key={idx} className="truncate">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-1">Maintenance Guide</span>
                      <p className="text-white/60 leading-relaxed">{activeKatana.maintenance}</p>
                    </div>
                  </div>

                  {/* Fictional Disclaimer */}
                  <div className="flex items-start gap-2.5 bg-red-950/20 border border-red-500/20 rounded-xl p-3 text-[10px] text-red-300/80 leading-normal mt-2">
                    <AlertTriangle size={14} className="shrink-0 text-red-500 mt-0.5" />
                    <p>
                      <strong className="uppercase">Notice:</strong> {activeKatana.disclaimer} This is a portfolio-only conceptual interface. No actual currency or merchandise is transacted.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-4 mt-2">
                    <button
                      onClick={handleReserve}
                      disabled={isProcessing}
                      className={`flex-1 min-h-[46px] rounded-lg font-mono text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center ${
                        isProcessing
                          ? 'bg-neutral-800 text-white/50 cursor-wait'
                          : 'bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_0_24px_rgba(220,38,38,0.3)]'
                      }`}
                    >
                      {isProcessing ? 'Transmitting Request...' : 'Reserve Concept Blade'}
                    </button>
                    <button
                      onClick={handleClose}
                      onMouseEnter={playHover}
                      className="min-h-[46px] sm:px-6 rounded-lg border border-white/10 hover:border-white/30 bg-transparent text-white/80 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center gap-6 py-12 px-6 rounded-2xl border border-white/10 bg-white/[0.02] my-auto"
                >
                  <CheckCircle2 className="text-red-500" size={48} />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white text-xl font-display uppercase tracking-widest">Concept Reserved</h2>
                    <p className="text-neutral-400 text-xs font-mono tracking-wide leading-relaxed max-w-sm mx-auto">
                      TRANSMISSION SUCCESSFUL.<br />
                      The {activeKatana.name} has been added to your vault catalog. Core reactor telemetry synced.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 w-full max-w-xs mt-4">
                    <button
                      onClick={handleClose}
                      className="min-h-[44px] w-full rounded-lg bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      Return to Vault
                    </button>
                    <div className="flex justify-center items-center gap-2 text-neutral-500 text-[9px] uppercase tracking-wider font-mono">
                      <ShieldCheck size={12} />
                      <span>Fictional booking simulation complete</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
