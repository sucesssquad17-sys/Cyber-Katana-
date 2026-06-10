import React, { useRef, useEffect } from 'react';
import KatanaCanvas from './components/KatanaCanvas';
import ScrollStages from './components/ScrollStages';
import { audio } from './utils/AudioEngine';
import { useCustomScroll } from './hooks/useCustomScroll';

function App() {
  const containerRef = useRef(null);
  
  // Drives the entire application with custom directional logic
  const { scrollYProgress } = useCustomScroll(containerRef);

  useEffect(() => {
    // Attempt to unlock audio seamlessly on any user interaction
    const unlockAudio = async () => {
      try {
        const unlocked = await audio.tryUnlock();
        if (unlocked) {
          const events = ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart', 'wheel', 'touchmove'];
          events.forEach(e => window.removeEventListener(e, unlockAudio));
        }
      } catch (e) {
        console.error("Failed to unlock audio", e);
      }
    };

    const events = ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart', 'wheel', 'touchmove'];
    events.forEach(e => window.addEventListener(e, unlockAudio));

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      audio.setScrollProgress(latest);
    });

    return () => {
      unsubscribe();
      events.forEach(e => window.removeEventListener(e, unlockAudio));
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="w-full bg-black relative">
      <div className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-10 overflow-hidden">
        <KatanaCanvas scrollYProgress={scrollYProgress} />
        <ScrollStages scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

export default App;
