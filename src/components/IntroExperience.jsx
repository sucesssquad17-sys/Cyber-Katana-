import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import KatanaCanvas from './KatanaCanvas';
import ScrollStages from './ScrollStages';
import { audio } from '../utils/AudioEngine';

export default function IntroExperience({ onOpenSpecs, onOpenCheckout }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      audio.setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-black md:h-[360vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
        <KatanaCanvas scrollYProgress={smoothProgress} />
        <div className="hud-grid absolute inset-0 z-20 opacity-35" />
        <div className="noise-overlay absolute inset-0 z-20 opacity-50" />
        <div className="absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-black via-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-56 bg-gradient-to-t from-black via-black/75 to-transparent" />

        <ScrollStages
          scrollYProgress={smoothProgress}
          onOpenSpecs={onOpenSpecs}
          onOpenCheckout={onOpenCheckout}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex justify-center px-6">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-px w-full max-w-sm origin-left bg-gradient-to-r from-red-600 via-white to-red-600"
          />
        </div>
      </div>
    </section>
  );
}
