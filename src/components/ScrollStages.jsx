import { useRef } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, Crosshair, ScanLine, Shield, Sparkles } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

function scrollToArchive() {
  const element = document.getElementById('blade-archive');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ScrollStages({ scrollYProgress, onOpenCheckout }) {
  const previous = useRef(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const prev = previous.current;

    if (prev <= 0.06 && latest > 0.06) audio.playShing();
    if (prev <= 0.22 && latest > 0.22) audio.playWhoosh();
    if (prev <= 0.38 && latest > 0.38) audio.playBladeGlide();
    if (prev <= 0.58 && latest > 0.58) audio.playPulse();
    if (prev <= 0.76 && latest > 0.76) audio.playWhoosh();
    if (prev <= 0.9 && latest > 0.9) audio.playImpact();

    previous.current = latest;
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.22, 0.34], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.34], [0, -70]);
  const heroClip = useTransform(scrollYProgress, [0.03, 0.16], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  const systemsOpacity = useTransform(scrollYProgress, [0.18, 0.34, 0.62, 0.74], [0, 1, 1, 0]);
  const systemsX = useTransform(scrollYProgress, [0.18, 0.32], [80, 0]);

  const unlockOpacity = useTransform(scrollYProgress, [0.62, 0.78, 1], [0, 1, 0.75]);
  const unlockY = useTransform(scrollYProgress, [0.62, 0.84], [28, 0]);
  const slashScaleX = useTransform(scrollYProgress, [0.72, 0.9], [0, 1.2]);
  const slashOpacity = useTransform(scrollYProgress, [0.72, 0.82, 1], [0, 1, 0.25]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {/* Hero Section */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex items-center"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-10 px-6 md:px-10 lg:px-16 pointer-events-auto">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-red-500">
              Cyber Katana / X-01 Concept
            </span>
            <h1 className="mt-3 md:mt-6 font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[0.06em] md:tracking-[0.14em] text-white leading-[1.1]">
              A premium
              <br />
              design concept.
            </h1>
            <div className="mt-4 md:mt-6 border-l border-red-500/50 pl-4">
              <motion.p
                style={{ clipPath: heroClip }}
                className="font-mono text-xs uppercase tracking-[0.2em] md:tracking-[0.28em] text-white/58"
              >
                Loading assets and animations...
              </motion.p>
            </div>
            <p className="mt-4 md:mt-8 max-w-xl text-sm md:text-lg leading-relaxed text-white/68">
              Multiple color variants available. Explore this cinematic landing page concept featuring interactive 3D elements and scroll animations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
            <button
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => {
                audio.playBeep();
                scrollToArchive();
              }}
              className="cyber-button min-h-[44px] px-6 py-3.5 text-[10px] w-full sm:w-auto"
            >
              View Catalog
            </button>
            <button
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => {
                audio.playBeep();
                onOpenCheckout('X-09');
              }}
              className="cyber-button cyber-button--ghost min-h-[44px] px-6 py-3.5 text-[10px] w-full sm:w-auto"
            >
              Reserve Blade
            </button>
          </div>
        </div>
      </motion.div>

      {/* Systems Panel - Positioned responsive side or bottom */}
      <motion.div
        style={{ opacity: systemsOpacity, x: systemsX }}
        className="absolute inset-x-6 bottom-20 md:bottom-auto md:right-0 md:inset-y-0 flex items-center justify-end md:px-10 lg:px-16"
      >
        <div className="grid w-full max-w-sm md:max-w-xl grid-cols-1 gap-2 md:gap-4 pointer-events-auto">
          <StagePanel
            icon={Crosshair}
            label="Grip"
            title="Carbon-Forged Control"
            copy="Engineered for calm handling and exact balance."
          />
          <StagePanel
            icon={Shield}
            label="Sheath"
            title="Titanium Mag-Lock"
            copy="Instant-release styling with ceremonial restraint."
          />
          <StagePanel
            icon={Sparkles}
            label="Edge"
            title="Plasma Finish"
            copy="Redline treatment tuned for visual impact."
          />
        </div>
      </motion.div>

      {/* Loading Complete System Check */}
      <motion.div
        style={{ opacity: unlockOpacity, y: unlockY }}
        className="absolute inset-x-6 bottom-10 md:bottom-14 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative max-w-3xl">
            <motion.div
              style={{ scaleX: slashScaleX, opacity: slashOpacity }}
              className="mb-4 h-px origin-left bg-gradient-to-r from-red-600 via-white to-red-600 shadow-[0_0_24px_rgba(248,113,113,0.8)]"
            />
            <div className="flex flex-col gap-3 rounded-[1.2rem] md:rounded-[1.75rem] border border-white/10 bg-black/55 px-4 py-4 md:px-6 md:py-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.44em] text-red-500">
                  System Check
                </span>
                <h2 className="font-display text-xl md:text-4xl uppercase tracking-[0.12em] text-white">
                  Loading Complete.
                </h2>
                <p className="text-xs md:text-sm text-white/55">
                  Welcome to the showcase.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.28em] text-white/55 mt-2 md:mt-0">
                <ScanLine size={14} className="text-red-400" />
                scroll to continue
                <ArrowRight size={14} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StagePanel({ icon: Icon, label, title, copy }) {
  return (
    <div
      onMouseEnter={() => audio.playGlassTap()}
      className="blade-panel rounded-[1rem] md:rounded-[1.5rem] bg-black/45 px-4 py-3 md:px-5 md:py-5"
    >
      <div className="mb-2 md:mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.38em] text-red-500">
          {label}
        </span>
        <Icon className="text-white/35" size={14} />
      </div>
      <h3 className="font-display text-lg md:text-2xl uppercase tracking-[0.1em] text-white">
        {title}
      </h3>
      <p className="mt-1 md:mt-3 max-w-md text-xs md:text-sm leading-relaxed text-white/60">{copy}</p>
    </div>
  );
}
