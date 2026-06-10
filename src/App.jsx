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
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-500">
          <button 
            onClick={handleInitialize}
            className="group relative px-6 md:px-8 py-4 bg-transparent border border-red-900/50 hover:border-red-500/80 transition-all duration-300 cursor-pointer overflow-hidden rounded-sm flex items-center gap-4 w-[90vw] max-w-sm"
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-red-600/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            <div className="flex flex-col items-start relative z-10">
              <span className="text-red-500 font-mono tracking-[0.3em] uppercase text-sm group-hover:text-red-400 transition-colors">
                Initialize Sequence
              </span>
              <span className="text-red-700 font-mono tracking-[0.2em] uppercase text-[10px] mt-1 group-hover:text-red-500 transition-colors">
                ( Click to Enter )
              </span>
            </div>
            
            {/* Cyberpunk corner accents */}
            <div className="absolute top-0 left-0 w-2 h-[1px] bg-red-500/50" />
            <div className="absolute top-0 left-0 w-[1px] h-2 bg-red-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-red-500/50" />
            <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-red-500/50" />
          </button>
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
