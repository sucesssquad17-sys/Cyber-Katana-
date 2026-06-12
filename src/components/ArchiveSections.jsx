import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const archiveItems = [
  {
    id: 'X-01',
    name: 'Crimson Silence',
    series: 'Crimson Series',
    note: 'Crimson plasma edge / first archive issue',
    src: asset('katanas/x01-crimson-red.webp'),
    accent: '239,68,68',
  },
  {
    id: 'X-02',
    name: 'Azure Wraith',
    series: 'Signal Series',
    note: 'Electric blue edge / cold mist chamber',
    src: asset('katanas/x02-electric-blue.webp'),
    accent: '59,130,246',
  },
  {
    id: 'X-03',
    name: 'Viper Coil',
    series: 'Venom Series',
    note: 'Emerald core / toxic glow lattice',
    src: asset('katanas/x03-emerald-green.webp'),
    accent: '34,197,94',
  },
  {
    id: 'X-04',
    name: 'Neon Shogun',
    series: 'Ceremony Series',
    note: 'Violet plasma line / ritual-grade finish',
    src: asset('katanas/x04-royal-purple.webp'),
    accent: '168,85,247',
  },
  {
    id: 'X-05',
    name: 'Ghost Alloy',
    series: 'Null Series',
    note: 'White alloy edge / frost-signal silence',
    src: asset('katanas/x05-ghost-white.webp'),
    accent: '226,232,240',
  },
  {
    id: 'X-06',
    name: 'Solar Circuit',
    series: 'Crown Series',
    note: 'Amber charge line / royal heat bloom',
    src: asset('katanas/x06-molten-gold.webp'),
    accent: '245,158,11',
  },
  {
    id: 'X-07',
    name: 'Cyan Rift',
    series: 'Rift Series',
    note: 'Cyan-teal current / deep signal split',
    src: asset('katanas/x07-neon-cyan.webp'),
    accent: '20,184,166',
  },
];

const buildNotes = [
  {
    id: '01',
    title: 'Visual System',
    body:
      'Ancient weapon silhouette, future-grade interface language, and a restrained red-on-black command layer that speaks before the product is described.',
  },
  {
    id: '02',
    title: 'Motion Sequence',
    body:
      'The scroll is treated like a draw ritual: pressure builds, the blade flashes, then the archive opens — revealing the world inside.',
  },
  {
    id: '03',
    title: 'Product Myth',
    body:
      'Cyber Katana is not presented like a store item. It is framed like a relic with memory, scarcity, and atmosphere earned over time.',
  },
  {
    id: '04',
    title: 'Sound Design',
    body:
      'Each scroll threshold triggers a distinct blade audio cue — whoosh, impact, plasma hum. The site has a voice, not just visuals.',
  },
  {
    id: '05',
    title: 'Archive Logic',
    body:
      'Seven variants, each with its own signal color, material language, and access tier. The archive reads like a classified relic index.',
  },
];

function playHover() {
  audio.playGlassTap();
}

function playClick() {
  audio.playBeep();
}

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function AmbientField({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{ opacity: [0.16, 0.24, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_74%_36%,rgba(220,38,38,0.09),transparent_18%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.04),transparent_14%)]"
      />
      <motion.div
        animate={{ opacity: [0.08, 0.14, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(255,255,255,0.12)_1px,transparent_1px),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_42%_78%,rgba(220,38,38,0.18)_1px,transparent_1px)] bg-[length:180px_180px]"
      />
    </div>
  );
}

function TransitionWipe({ variant }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
  const scanY = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);
  const slashScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const bloomScale = useTransform(scrollYProgress, [0.15, 0.9], [0.7, 1.2]);

  const config = {
    smoke: 'MEMORY LAYER OPENING',
    scan: 'ARCHIVE INDEXING',
    blackout: 'SIGNAL LOST / RESTORED',
    bloom: 'FINAL TRANSMISSION READY',
  };

  return (
    <section
      ref={ref}
      className="relative h-[18vh] min-h-20 overflow-hidden bg-black md:h-[26vh] md:min-h-36"
    >
      <AmbientField className="opacity-55" />

      {variant === 'smoke' ? (
        <>
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_34%),radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.06),transparent_24%)] blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_65%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_68%_30%,rgba(220,38,38,0.06),transparent_18%)]" />
        </>
      ) : null}

      {variant === 'scan' ? (
        <motion.div
          style={{ y: scanY }}
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent"
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </motion.div>
      ) : null}

      {variant === 'blackout' ? (
        <>
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-black"
          />
          <motion.div
            style={{ scaleX: slashScale, opacity: glowOpacity }}
            className="absolute left-[-10%] top-1/2 h-[2px] w-[120%] origin-center -translate-y-1/2 rotate-[-16deg] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_30px_rgba(220,38,38,0.9)]"
          />
        </>
      ) : null}

      {variant === 'bloom' ? (
        <motion.div
          style={{ opacity: glowOpacity, scale: bloomScale }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent_28%)]"
        />
      ) : null}

      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/24 md:text-[9px] md:tracking-[0.22em]">
          {config[variant]}
        </span>
      </motion.div>
    </section>
  );
}

function KatanaImage({ src, alt, className, priority = false, accent = '220,38,38' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(${accent}, 0.12), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.42))`,
        }}
        className={`flex items-center justify-center ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            style={{ backgroundColor: `rgba(${accent}, 0.5)` }}
            className="h-16 w-px shadow-[0_0_14px_currentColor]"
          />
          <span className="sr-only">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

function ArchiveUnlock() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const flashOpacity = useTransform(scrollYProgress, [0.1, 0.18, 0.28], [0, 0.9, 0]);
  const slashScale = useTransform(scrollYProgress, [0.08, 0.24], [0, 1]);
  const shakeX = useTransform(scrollYProgress, [0.12, 0.16, 0.2, 0.24, 0.3], [0, -10, 8, -6, 0]);

  const stats = [
    { label: 'VARIANTS', value: '07' },
    { label: 'MATERIAL GRADE', value: 'S-CLASS' },
    { label: 'ARCHIVE STATUS', value: 'LIVE' },
    { label: 'EDITION', value: 'COLLECTOR' },
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 md:px-10 lg:px-16"
    >
      {/* Background: blueprint katana image */}
      <div className="absolute inset-0">
        <img
          src={asset('katanas/blueprint-x01.webp')}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.12]"
        />
        {/* Deep vignette so edges stay dark */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.92)_80%)]" />
        {/* Red center bloom */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(220,38,38,0.14),transparent_38%)]" />
        {/* Scan lines texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_3px] opacity-40" />
      </div>

      {/* Flash + slash overlay (scroll-driven) */}
      <motion.div style={{ x: shakeX }} className="absolute inset-0 z-10 pointer-events-none">
        <motion.div style={{ opacity: flashOpacity }} className="absolute inset-0 bg-white" />
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.32),transparent_40%)]"
        />
        <motion.div
          style={{ scaleX: slashScale }}
          className="absolute left-[-10%] top-1/2 h-[3px] w-[120%] origin-center -translate-y-1/2 rotate-[-17deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_rgba(248,113,113,1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-lg" />
        </motion.div>
      </motion.div>

      {/* Main content — whileInView, always becomes visible */}
      <div className="relative z-20 flex flex-col items-center gap-6 text-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.08em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.32em' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[10px] uppercase text-red-500 md:text-[11px]"
        >
          ARCHIVE SEAL BROKEN
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-display text-5xl uppercase tracking-[0.08em] text-white md:text-7xl lg:text-8xl"
        >
          X-01 ACCESS GRANTED
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="max-w-sm font-mono text-[11px] leading-7 text-white/40 md:max-w-md md:text-xs"
        >
          The Crimson Series archive is now unsealed. Seven relics indexed, each carrying a unique signal signature.
        </motion.p>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 flex divide-x divide-white/10 overflow-hidden rounded-[1rem] border border-white/12 bg-black/65 backdrop-blur-md"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-6 py-4 sm:px-8">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-red-500">{s.label}</span>
              <span className="font-display text-xl text-white">{s.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Corner HUD decorations */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 md:left-10 md:top-10">
        <span>SYS / ARCHIVE-X</span>
        <span className="text-red-500/50">● SIGNAL ACTIVE</span>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-20 text-right font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 md:bottom-10 md:right-10">
        <span>RELIC INDEX / 001</span>
      </div>
    </section>
  );
}

function LoreScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.5], [1.05, 1]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.6], [0.8, 1.15]);
  const scanY = useTransform(scrollYProgress, [0.2, 0.75], ['-10%', '110%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(255,255,255,0.04),transparent_16%),radial-gradient(circle_at_76%_58%,rgba(220,38,38,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1fr)] lg:items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
              MEMORY LAYER / NEO-TOKYO
            </span>
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]"
              >
                NOT FORGED FOR WAR.
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]"
              >
                FORGED FOR SILENCE.
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="max-w-xl text-base leading-8 text-white/68 md:text-lg"
          >
            In the lower cities of Neo-Tokyo, conflict ended before sound could escape. X-01 is a fictional relic built between ceremony and machine logic — a blade remembered before it is drawn.
          </motion.p>

          {/* Quote block */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="border-l-2 border-red-500/60 pl-5"
          >
            <p className="font-mono text-sm italic leading-7 text-white/50 md:text-base">
              &ldquo;The weapon that carries no fear is the one the enemy never sees coming.&rdquo;
            </p>
            <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-red-500/80">
              — NEO-TOKYO RELIC CODEX, ENTRY 001
            </span>
          </motion.blockquote>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { label: 'BLADE LENGTH', value: '73cm' },
              { label: 'EDGE MATERIAL', value: 'PLASMA ALLOY' },
              { label: 'WEIGHT CLASS', value: 'ULTRA-LIGHT' },
              { label: 'SERIES', value: 'CRIMSON' },
              { label: 'PRODUCTION', value: 'LIMITED' },
              { label: 'SIGNAL TYPE', value: 'REDLINE' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 rounded-[0.8rem] border border-white/8 bg-white/[0.025] px-3 py-3"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-red-500/80">{stat.label}</span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wide text-white/85">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 shadow-[0_0_80px_rgba(220,38,38,0.08)]"
        >
          <motion.div
            style={{ scale: glowScale }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(220,38,38,0.18),transparent_36%)]"
          />

          <div className="relative min-h-[22rem] p-3 md:min-h-[34rem] md:p-4">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="h-full w-full"
            >
              <KatanaImage
                src={asset('katanas/blueprint-x01.webp')}
                alt="X-01 blueprint"
                priority
                accent="220,38,38"
                className="h-full w-full rounded-[1.5rem] object-cover object-center opacity-95"
              />
            </motion.div>

            <motion.div
              style={{ y: scanY }}
              className="pointer-events-none absolute inset-x-6 top-0 h-20 bg-gradient-to-b from-transparent via-white/12 to-transparent md:inset-x-8"
            >
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </motion.div>

            <div className="absolute left-6 top-6 border-l border-red-500/55 pl-3 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 md:left-10 md:top-10 md:tracking-[0.24em]">
              PLASMA EDGE STABLE
            </div>
            <div className="absolute bottom-6 right-6 border-r border-white/20 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 md:bottom-10 md:right-10 md:tracking-[0.24em]">
              MAG-LOCK SHEATH
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BladeArchive({ onOpenCheckout, onOpenSpecs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBlade = archiveItems[activeIndex];

  return (
    <section
      id="blade-archive"
      className="relative overflow-x-clip bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16"
    >
      <AmbientField className="opacity-60" />
      <div
        style={{
          backgroundImage: `radial-gradient(circle at 42% 30%, rgba(${activeBlade.accent}, 0.18), transparent 24%)`,
        }}
        className="absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            BLADE ARCHIVE / ACTIVE VARIANTS
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]">
            CHOOSE YOUR RELIC
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/58 md:text-lg">
            Seven sealed variants. One myth. Each blade carries a different signal, material language, and combat ritual.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_22rem] xl:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlade.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/45"
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)]">
                <div
                  style={{
                    backgroundImage: `radial-gradient(circle at 52% 48%, rgba(${activeBlade.accent}, 0.3), transparent 36%)`,
                  }}
                  className="relative min-h-[32rem] overflow-hidden p-4 md:min-h-[46rem] md:p-8"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,rgba(0,0,0,0.42)_100%)]" />
                  <motion.div
                    animate={{ opacity: [0.16, 0.28, 0.18] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      backgroundImage: `radial-gradient(circle at 58% 52%, rgba(${activeBlade.accent}, 0.26), transparent 28%)`,
                    }}
                    className="absolute inset-0 blur-3xl"
                  />
                  <motion.div
                    initial={{ x: '-120%' }}
                    animate={{ x: '120%' }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-md"
                  />
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/18 to-transparent" />
                  <KatanaImage
                    src={activeBlade.src}
                    alt={`${activeBlade.id} ${activeBlade.name}`}
                    priority
                    accent={activeBlade.accent}
                    className="relative z-10 h-full w-full object-contain"
                  />

                  <div
                    style={{
                      borderColor: `rgba(${activeBlade.accent}, 0.45)`,
                      color: `rgb(${activeBlade.accent})`,
                    }}
                    className="absolute left-5 top-5 rounded-full border bg-black/55 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] md:tracking-[0.22em]"
                  >
                    ACTIVE RECORD / {activeBlade.id}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8 border-t border-white/10 p-6 md:p-8 lg:border-l lg:border-t-0">
                  <motion.div
                    initial={{ opacity: 0.45 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col gap-4"
                  >
                    <span
                      style={{ color: `rgb(${activeBlade.accent})` }}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] md:tracking-[0.28em]"
                    >
                      SIGNAL LOCKED / {activeBlade.id}
                    </span>
                    <h3 className="font-display text-3xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
                      {activeBlade.name}
                    </h3>
                    <p className="text-base leading-8 text-white/66">{activeBlade.note}</p>
                  </motion.div>

                  <motion.div
                    key={`${activeBlade.id}-meta`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid gap-4 text-sm text-white/48 sm:grid-cols-2 lg:grid-cols-1"
                  >
                    <div className="border-t border-white/10 pt-4">
                      <div
                        style={{ color: `rgb(${activeBlade.accent})` }}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] md:tracking-[0.24em]"
                      >
                        Variant
                      </div>
                      <div className="mt-2">{activeBlade.series}</div>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div
                        style={{ color: `rgb(${activeBlade.accent})` }}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] md:tracking-[0.24em]"
                      >
                        Record State
                      </div>
                      <div className="mt-2">Relic online</div>
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-4">
                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        onOpenSpecs();
                      }}
                      className="inline-flex items-center justify-center gap-2 border border-white/12 bg-white/[0.03] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-red-500/55 hover:bg-red-950/20 md:tracking-[0.28em]"
                    >
                      Open Build File
                    </button>
                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        onOpenCheckout();
                      }}
                      style={{
                        borderColor: `rgba(${activeBlade.accent}, 0.45)`,
                        backgroundColor: `rgba(${activeBlade.accent}, 0.88)`,
                      }}
                      className="inline-flex items-center justify-center gap-2 border px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white/55 hover:bg-white hover:text-black md:tracking-[0.28em]"
                    >
                      Acquire Variant
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {archiveItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  onMouseEnter={() => {
                    playHover();
                    setActiveIndex(index);
                  }}
                  onClick={() => {
                    playClick();
                    setActiveIndex(index);
                  }}
                  className={`group relative overflow-hidden rounded-[1rem] border border-white/10 bg-black/52 text-left transition-all duration-300 ${
                    isActive ? 'bg-white/[0.04]' : 'hover:border-white/18'
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `rgba(${item.accent}, 0.45)`,
                          boxShadow: `0 0 18px rgba(${item.accent}, 0.14)`,
                        }
                      : undefined
                  }
                >
                  <div
                    style={{ backgroundColor: `rgba(${item.accent}, ${isActive ? 0.85 : 0.45})` }}
                    className="absolute inset-y-0 left-0 w-px"
                  />
                  <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] items-center gap-3 p-3">
                    <div
                      style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(${item.accent}, 0.18), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.32))`,
                      }}
                      className="relative h-16 overflow-hidden rounded-[0.8rem]"
                    >
                      <KatanaImage
                        src={item.src}
                        alt={`${item.id} selector`}
                        accent={item.accent}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          style={{ color: `rgb(${item.accent})` }}
                          className="font-mono text-[9px] uppercase tracking-[0.14em] md:tracking-[0.22em]"
                        >
                          {item.id}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/38 md:tracking-[0.2em]">
                          {isActive ? 'ACTIVE' : 'SEALED'}
                        </span>
                      </div>
                      <span className="font-display text-lg uppercase tracking-[0.04em] text-white md:text-xl">
                        {item.name}
                      </span>
                      <span
                        style={{ color: isActive ? `rgb(${item.accent})` : undefined }}
                        className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/40 md:text-[9px] md:tracking-[0.18em]"
                      >
                        {isActive ? 'ACTIVE VARIANT' : 'SIGNAL LOCKED'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildFile() {
  return (
    <section className="relative bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%)]" />
      <AmbientField className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            STUDIO TRANSMISSION / BUILD FILE
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
            THE SYSTEM BEHIND THE BLADE
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/55">
            A breakdown of the design decisions, motion principles, and product mythology that power this experience.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildNotes.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/55 p-6"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-red-500 via-white/80 to-transparent"
              />
              <div className="mb-5 flex flex-col gap-3">
                <div className="flex items-end justify-between gap-3">
                  <span className="font-display text-5xl text-white/14">{card.id}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-500 md:tracking-[0.22em]">
                    SYSTEM NOTE
                  </span>
                </div>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-white/64">{card.body}</p>
            </motion.article>
          ))}
        </div>

        {/* Archive stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] sm:grid-cols-4"
        >
          {[
            { label: 'TOTAL VARIANTS', value: '07', sub: 'sealed archive' },
            { label: 'SCROLL STAGES', value: '12', sub: 'motion sequences' },
            { label: 'SIGNAL LAYERS', value: '04', sub: 'audio + visual' },
            { label: 'ARCHIVE STATUS', value: 'LIVE', sub: 'transmission open' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-black/60 px-5 py-5">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-red-500">{item.label}</span>
              <span className="font-display text-3xl text-white">{item.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA({ onOpenCheckout, onOpenSpecs }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const glowPulse = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      {/* Subtle ambient background — no image, just atmosphere */}
      <motion.div
        style={{ scale: glowPulse }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(220,38,38,0.13),transparent_42%)]"
      />
      <AmbientField className="opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Two-column grid: text left, katana image right */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">

          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="flex flex-col gap-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-500 md:text-[11px]">
              FINAL TRANSMISSION
            </span>

            <motion.h2
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="font-display text-5xl uppercase leading-[1.05] tracking-[0.04em] text-white md:text-6xl lg:text-7xl"
            >
              BUILD A WORLD<br />THEY REMEMBER.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="max-w-md text-base leading-8 text-white/55 md:text-lg"
            >
              Cyber Katana X-01 is a fictional product experience built to showcase cinematic web design, motion language, and premium product storytelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onMouseEnter={playHover}
                onClick={() => { playClick(); onOpenCheckout(); }}
                className="inline-flex items-center gap-2 border border-red-500/55 bg-red-600 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                Commission This Style
              </button>
              <button
                onMouseEnter={playHover}
                onClick={() => { playClick(); window.location.href = 'mailto:your@email.com'; }}
                className="inline-flex items-center gap-2 border border-white/14 bg-white/[0.03] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-red-500/45 hover:bg-red-950/20"
              >
                Send Transmission
              </button>
              <button
                onMouseEnter={playHover}
                onClick={() => { playClick(); scrollToId('blade-archive'); }}
                className="inline-flex items-center gap-2 border border-white/14 bg-white/[0.03] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-red-500/45 hover:bg-red-950/20"
              >
                Inspect Archive
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.38 }}
              className="h-px origin-left bg-gradient-to-r from-red-500/35 via-white/8 to-transparent"
            />

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-wrap items-center gap-5"
            >
              <div className="flex items-center gap-2">
                <ArrowRight size={10} className="text-red-400" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">X-01 Crimson Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={10} className="text-red-400" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">S-Class Relic / Ltd. Collector</span>
              </div>
              <button
                onMouseEnter={playHover}
                onClick={() => { playClick(); onOpenSpecs(); }}
                className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-red-400"
              >
                Open Build File →
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Katana image — self-contained, no bleed into left col */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative"
          >
            {/* Frame card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_0_80px_rgba(220,38,38,0.1)]">
              {/* Top HUD bar */}
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-red-400">
                  FINAL RECORD / X-01
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/30">LIVE</span>
                </div>
              </div>

              {/* Image */}
              <motion.div
                style={{ y: imageY }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <KatanaImage
                  src={asset('katanas/final-silhouette.webp')}
                  alt="X-01 final silhouette"
                  accent="220,38,38"
                  className="h-full w-full object-cover object-center"
                />
                {/* Subtle red glow overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(220,38,38,0.15),transparent_50%)]" />
                {/* Bottom fade into card */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              </motion.div>

              {/* Bottom stat strip */}
              <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
                {[
                  { label: 'CLASS', value: 'X-01' },
                  { label: 'SIGNAL', value: 'CRIMSON' },
                  { label: 'TIER', value: 'S-CLASS' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1 py-3">
                    <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-red-500/70">{s.label}</span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wide text-white/80">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative corner label */}
            <div className="absolute -bottom-6 right-4 font-mono text-[7px] uppercase tracking-[0.2em] text-white/18">
              RELIC ARCHIVE / COLLECTOR EDITION
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function ArchiveSections({ onOpenCheckout, onOpenSpecs }) {
  return (
    <>
      <ArchiveUnlock />
      <TransitionWipe variant="smoke" />
      <LoreScene />
      <TransitionWipe variant="scan" />
      <BladeArchive
        onOpenCheckout={onOpenCheckout}
        onOpenSpecs={onOpenSpecs}
      />
      <TransitionWipe variant="blackout" />
      <BuildFile />
      <TransitionWipe variant="bloom" />
      <FinalCTA
        onOpenCheckout={onOpenCheckout}
        onOpenSpecs={onOpenSpecs}
      />
    </>
  );
}
