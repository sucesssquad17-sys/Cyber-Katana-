import { useRef } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, Crosshair, ScanLine, Shield, Sparkles } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

function scrollToArchive() {
  const element = document.getElementById('archive-unlock');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ScrollStages({ scrollYProgress, onOpenSpecs, onOpenCheckout }) {
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
    <div className="absolute inset-0 z-30">
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex items-center"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-red-500">
              Cyber Katana / X-01 Collector Concept
            </span>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.14em] text-white md:text-7xl lg:text-8xl">
              Forged for
              <br />
              silent impact.
            </h1>
            <div className="mt-6 border-l border-red-500/50 pl-4">
              <motion.p
                style={{ clipPath: heroClip }}
                className="font-mono text-sm uppercase tracking-[0.28em] text-white/58"
              >
                Initializing blade core and archive path...
              </motion.p>
            </div>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/68 md:text-lg">
              The opening stays cinematic and self-contained. When it ends, the katana reveals the rest of the site instead of dropping the visitor into a normal layout.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => {
                audio.playBeep();
                scrollToArchive();
              }}
              className="cyber-button px-6 py-4 text-[10px]"
            >
              Enter Archive
            </button>
            <button
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => {
                audio.playBeep();
                onOpenSpecs();
              }}
              className="cyber-button cyber-button--ghost px-6 py-4 text-[10px]"
            >
              View Specs
            </button>
            <button
              onMouseEnter={() => audio.playGlassTap()}
              onClick={() => {
                audio.playBeep();
                onOpenCheckout();
              }}
              className="cyber-button cyber-button--ghost px-6 py-4 text-[10px]"
            >
              Acquire Edition
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: systemsOpacity, x: systemsX }}
        className="absolute inset-y-0 right-0 flex items-center justify-end px-6 md:px-10 lg:px-16"
      >
        <div className="grid w-full max-w-xl gap-4">
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

      <motion.div
        style={{ opacity: unlockOpacity, y: unlockY }}
        className="absolute inset-x-0 bottom-12 px-6 md:bottom-14 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative max-w-3xl">
            <motion.div
              style={{ scaleX: slashScaleX, opacity: slashOpacity }}
              className="mb-6 h-px origin-left bg-gradient-to-r from-red-600 via-white to-red-600 shadow-[0_0_24px_rgba(248,113,113,0.8)]"
            />
            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-black/55 px-6 py-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.44em] text-red-500">
                  Archive Handshake
                </span>
                <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-white md:text-4xl">
                  Archive Seal Broken.
                </h2>
                <p className="text-sm text-white/55 md:text-base">
                  X-01 memory layer restored.
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
                <ScanLine size={16} className="text-red-400" />
                scroll to continue
                <ArrowRight size={16} className="text-red-400" />
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
      className="blade-panel rounded-[1.5rem] bg-black/45 px-5 py-5"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-red-500">
          {label}
        </span>
        <Icon className="text-white/35" size={16} />
      </div>
      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-white/60">{copy}</p>
    </div>
  );
}
