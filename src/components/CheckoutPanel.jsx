import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { ChevronLeft, ChevronRight, Fingerprint, ShieldCheck } from 'lucide-react';

export default function CheckoutPanel({ isOpen, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    audio.playBeep();
    onClose();
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(false);
    }, 500);
  };

  const playHover = () => audio.playGlassTap();

  const handleAuthorize = () => {
    audio.playBeep();
    setIsProcessing(true);
    setTimeout(() => {
      audio.playImpact();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

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
                <h2 className="text-white font-bold tracking-[0.2em] uppercase text-lg">Acquisition Terminal</h2>
              </div>
              <p className="text-red-500 text-[10px] font-mono tracking-[0.3em] uppercase ml-11">Secure Syndicate Network</p>
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
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-widest uppercase mb-2">Buy Now</h1>
            <p className="text-red-500 text-xs font-mono tracking-[0.3em] uppercase">Choose your weapon</p>
            <div className="w-2 h-2 border border-red-500 rotate-45 mt-4" />
          </div>

          {/* Carousel Area */}
          <div className="flex-1 w-full flex items-center justify-center px-4 relative z-10 -mt-4">
            
            <button onMouseEnter={playHover} className="absolute left-8 w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-white hover:bg-red-900/40 hover:border-red-500 transition-all z-30">
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center justify-center gap-6 lg:gap-12 max-w-[1600px] w-full perspective-1000">
              
              {/* Left Variant: Phantom White */}
              <div className="hidden lg:flex flex-col w-[250px] h-[450px] bg-black/40 border border-white/5 backdrop-blur-sm relative transition-all duration-500 transform rotate-y-12 scale-90 opacity-60 hover:opacity-100 hover:scale-95 cursor-pointer">
                <div className="w-full h-full p-4 flex flex-col items-center">
                  <div className="w-full flex-1 bg-gradient-to-t from-neutral-900 to-black relative overflow-hidden flex items-center justify-center">
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[150%] h-[150%] object-cover -rotate-45 filter grayscale brightness-150 contrast-125 mix-blend-screen opacity-50" />
                  </div>
                  <div className="w-full pt-4 text-center">
                    <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">Phantom</h3>
                    <p className="text-neutral-500 text-[9px] font-mono tracking-widest uppercase">White Core / Unavailable</p>
                  </div>
                </div>
              </div>

              {/* Left Variant: Azure Blue */}
              <div className="hidden md:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative transition-all duration-500 transform rotate-y-6 scale-95 opacity-80 hover:opacity-100 hover:scale-100 cursor-pointer">
                <div className="w-full h-full p-4 flex flex-col items-center">
                  <div className="w-full flex-1 bg-gradient-to-t from-blue-950/40 to-black border border-blue-900/30 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen" />
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[150%] h-[150%] object-cover -rotate-45 filter hue-rotate-180 brightness-110 contrast-125 mix-blend-screen opacity-80" />
                  </div>
                  <div className="w-full pt-4 text-center">
                    <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">Azure Void</h3>
                    <p className="text-blue-500 text-[9px] font-mono tracking-widest uppercase">Cobalt Core / Select</p>
                  </div>
                </div>
              </div>

              {/* CENTER CARD: Primary Purchase Checkout */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="w-full max-w-[450px] bg-black/80 backdrop-blur-xl relative flex flex-col shadow-[0_0_50px_rgba(220,38,38,0.2)] z-20 border border-red-900/50"
              >
                {/* Glowing Borders */}
                <div className="absolute inset-0 border-2 border-red-600 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 blur-[8px]" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 blur-[8px]" />

                {/* Hero Image Block */}
                <div className="w-full h-[250px] bg-gradient-to-b from-red-950/20 to-black relative overflow-hidden flex flex-col items-center justify-center p-6 border-b border-red-900/30">
                   <div className="absolute w-[60%] h-[60%] bg-red-600/20 blur-[40px] rounded-full" />
                   <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Cyber Katana" className="w-[140%] h-[140%] object-cover rotate-[20deg] mix-blend-screen relative z-10 filter contrast-125 saturate-150" />
                   
                   <div className="absolute top-4 left-4 border border-red-500/30 bg-red-950/50 px-2 py-1">
                     <span className="text-red-500 font-mono text-[9px] tracking-widest uppercase">X-01 Base Model</span>
                   </div>
                </div>

                {/* Checkout Content */}
                <div className="p-8 flex flex-col gap-6">
                  
                  {!isSuccess ? (
                    <>
                      <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <div className="flex flex-col">
                          <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-1">Bloodline Red</h2>
                          <p className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase">Plasma Core</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-2xl font-light tracking-widest">$2,499</p>
                          <p className="text-red-500 font-mono text-[9px] tracking-widest uppercase">USDT / Crypto</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <input 
                          type="text" 
                          placeholder="NEURAL LINK ID"
                          className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs p-4 outline-none focus:border-red-500 focus:bg-red-950/10 transition-colors uppercase tracking-widest placeholder-neutral-600"
                        />
                        <button 
                          onClick={handleAuthorize}
                          onMouseEnter={playHover}
                          disabled={isProcessing}
                          className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all relative overflow-hidden group ${
                            isProcessing ? 'bg-red-900 text-red-500/50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                          }`}
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-3 font-mono">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          ) : (
                            <>
                              <span className="relative z-10">Authorize Purchase</span>
                              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 mt-2">
                        <ShieldCheck className="text-red-500/50" size={14} />
                        <span className="text-red-500/50 font-mono text-[8px] tracking-widest uppercase">Encrypted Syndicate Connection</span>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8"
                    >
                      <div className="w-16 h-16 border border-red-500 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                        <Fingerprint className="text-red-500" size={24} />
                      </div>
                      <h2 className="text-white text-lg font-bold uppercase tracking-widest">Authorization Confirmed</h2>
                      <p className="text-neutral-500 font-mono text-[10px] leading-relaxed max-w-[250px] uppercase tracking-widest">
                        Asset transferred to drop location. Await further instructions.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Right Variant: Emerald Green */}
              <div className="hidden md:flex flex-col w-[280px] h-[550px] bg-black/40 border border-white/5 backdrop-blur-sm relative transition-all duration-500 transform -rotate-y-6 scale-95 opacity-80 hover:opacity-100 hover:scale-100 cursor-pointer">
                <div className="w-full h-full p-4 flex flex-col items-center">
                  <div className="w-full flex-1 bg-gradient-to-t from-emerald-950/40 to-black border border-emerald-900/30 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/10 mix-blend-screen" />
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[150%] h-[150%] object-cover -rotate-45 filter hue-rotate-[120deg] brightness-110 contrast-125 mix-blend-screen opacity-80" />
                  </div>
                  <div className="w-full pt-4 text-center">
                    <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">Viper</h3>
                    <p className="text-emerald-500 text-[9px] font-mono tracking-widest uppercase">Emerald Core / Select</p>
                  </div>
                </div>
              </div>

              {/* Right Variant: Gold */}
              <div className="hidden lg:flex flex-col w-[250px] h-[450px] bg-black/40 border border-white/5 backdrop-blur-sm relative transition-all duration-500 transform -rotate-y-12 scale-90 opacity-60 hover:opacity-100 hover:scale-95 cursor-pointer">
                <div className="w-full h-full p-4 flex flex-col items-center">
                  <div className="w-full flex-1 bg-gradient-to-t from-amber-950/40 to-black border border-amber-900/30 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-500/10 mix-blend-screen" />
                    <img src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`} alt="Katana" className="w-[150%] h-[150%] object-cover -rotate-45 filter hue-rotate-[60deg] brightness-125 contrast-125 mix-blend-screen opacity-70" />
                  </div>
                  <div className="w-full pt-4 text-center">
                    <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">Sovereign</h3>
                    <p className="text-amber-500 text-[9px] font-mono tracking-widest uppercase">Gold Core / Waitlist</p>
                  </div>
                </div>
              </div>

            </div>

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
