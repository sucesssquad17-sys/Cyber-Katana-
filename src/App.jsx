import { useEffect, useState } from 'react';
import IntroExperience from './components/IntroExperience';
import ArchiveSections from './components/ArchiveSections';
import SpecsModal from './components/SpecsModal';
import CheckoutPanel from './components/CheckoutPanel';
import { audio } from './utils/AudioEngine';

function App() {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleInitialize = async () => {
    try {
      const unlocked = await audio.tryUnlock();
      if (unlocked) {
        setAudioInitialized(true);
      }
    } catch (error) {
      console.error('Failed to unlock audio', error);
      setAudioInitialized(true);
    }
  };

  useEffect(() => {
    const shouldLockScroll = !audioInitialized || isSpecsOpen || isCheckoutOpen;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [audioInitialized, isCheckoutOpen, isSpecsOpen]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {!audioInitialized && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black">
          <div className="hud-grid absolute inset-0 opacity-30" />
          <div className="noise-overlay absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_42%)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[44vw] w-[44vw] max-h-[520px] max-w-[520px] rounded-full border border-red-500/20 animate-[spin_32s_linear_infinite]" />
            <div className="absolute h-[36vw] w-[36vw] max-h-[440px] max-w-[440px] rounded-full border border-white/8 animate-[spin_48s_linear_infinite_reverse]" />
            <div className="absolute h-[52vw] w-[52vw] max-h-[620px] max-w-[620px] rounded-full border border-red-500/10 [border-style:dashed]" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-12 px-6 text-center">
            <div className="flex flex-col items-center gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.55em] text-red-500/90">
                System Standby / Archive Locked
              </span>
              <h1 className="font-display text-5xl uppercase tracking-[0.18em] text-white md:text-7xl">
                Cyber Katana <span className="text-red-500">X-01</span>
              </h1>
              <p className="max-w-2xl text-sm uppercase tracking-[0.28em] text-white/45 md:text-base">
                A cinematic concept landing page where the blade opens the rest of the world.
              </p>
            </div>

            <button
              onClick={handleInitialize}
              className="cyber-button group px-10 py-5"
            >
              <span>Initialize Sequence</span>
            </button>
          </div>
        </div>
      )}

      <SpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
      <CheckoutPanel isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      <main className="relative">
        <IntroExperience
          onOpenSpecs={() => setIsSpecsOpen(true)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
        <ArchiveSections
          onOpenSpecs={() => setIsSpecsOpen(true)}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      </main>
    </div>
  );
}

export default App;
