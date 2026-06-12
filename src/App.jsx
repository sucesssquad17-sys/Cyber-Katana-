import { useEffect, useState } from 'react';
import IntroExperience from './components/IntroExperience';
import ArchiveSections from './components/ArchiveSections';
import CheckoutPanel from './components/CheckoutPanel';
import { audio } from './utils/AudioEngine';

function App() {
  const [audioInitialized, setAudioInitialized] = useState(false);
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
    const shouldLockScroll = !audioInitialized || isCheckoutOpen;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [audioInitialized, isCheckoutOpen]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {!audioInitialized && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black">
          <div className="hud-grid absolute inset-0 opacity-30" />
          <div className="noise-overlay absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_42%)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_50%)]" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-10 px-6 text-center">
            <div className="flex flex-col items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500">
                System Standby
              </span>
              <h1 className="font-display text-4xl uppercase tracking-[0.1em] text-white md:text-5xl">
                Cyber Katana <span className="text-red-500">X-01</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 leading-loose">
                A cinematic concept landing page where the blade opens the rest of the world.
              </p>
            </div>

            <button
              onClick={handleInitialize}
              className="group relative overflow-hidden border border-white/20 bg-black px-8 py-4 transition-all hover:border-red-500/50 hover:bg-red-500/5"
            >
              <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 transition-colors group-hover:text-red-400">
                Enter Site
              </span>
            </button>
          </div>
        </div>
      )}


      <CheckoutPanel isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      <main className="relative">
        <IntroExperience
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
        <ArchiveSections
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      </main>
    </div>
  );
}

export default App;
