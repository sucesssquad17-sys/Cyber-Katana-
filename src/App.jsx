import React, { useRef, useState, useEffect } from 'react';
import KatanaCanvas from './components/KatanaCanvas';
import ScrollStages from './components/ScrollStages';
import SpecsModal from './components/SpecsModal';
import CheckoutPanel from './components/CheckoutPanel';
import { audio } from './utils/AudioEngine';
import { useCustomScroll } from './hooks/useCustomScroll';

function App() {
  const containerRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Drives the entire application with custom directional logic.
  // Block scrolling if audio is not initialized OR if a modal is open.
  const isScrollEnabled = audioInitialized && !isSpecsOpen && !isCheckoutOpen;
  const { scrollYProgress } = useCustomScroll(isScrollEnabled);

  const handleInitialize = async () => {
    try {
      const unlocked = await audio.tryUnlock();
      if (unlocked) {
        setAudioInitialized(true);
      }
    } catch (e) {
      console.error("Failed to unlock audio", e);
      // Even if audio fails, let them see the site
      setAudioInitialized(true);
    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      audio.setScrollProgress(latest);
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="w-full bg-black relative">
      
      {/* Initialization Overlay */}
      {!audioInitialized && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black transition-opacity duration-1000">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
            <div className="w-[50vw] max-w-[500px] aspect-square rounded-full border-[1px] border-red-500/30 animate-[spin_32s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
            <div className="absolute w-[40vw] max-w-[400px] aspect-square rounded-full border-[1px] border-white/5 animate-[spin_48s_linear_infinite_reverse]"></div>
          </div>

          <div className="flex flex-col items-center gap-24 z-10">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="text-red-500 font-mono text-[10px] md:text-[12px] tracking-[0.5em] uppercase animate-pulse">
                System.Standby
              </div>
              <h1 className="text-white text-4xl md:text-6xl font-light tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Cyber Katana <span className="font-bold text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">X-01</span>
              </h1>
            </div>

            <button 
              onClick={handleInitialize}
              className="group flex flex-col items-center gap-4 transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="text-white font-mono text-sm md:text-base tracking-[0.3em] uppercase group-hover:text-red-500 transition-colors duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
                Initialize Sequence
              </div>
              <div className="text-neutral-500 font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                ( Click to Enter )
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Cinematic Modals */}
      <SpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
      <CheckoutPanel isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      <div className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-10 overflow-hidden">
        <KatanaCanvas scrollYProgress={scrollYProgress} />
        <ScrollStages 
          scrollYProgress={scrollYProgress} 
          onOpenSpecs={() => setIsSpecsOpen(true)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      </div>
    </div>
  );
}

export default App;
