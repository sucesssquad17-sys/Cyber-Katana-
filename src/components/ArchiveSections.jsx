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
    name: 'Azure Wraith',
    series: 'Signal Series',
    note: 'Electric blue edge / cold mist chamber',
    src: asset('katanas/x01-crimson-silence.svg'),
    accent: '59,130,246',
  },
  {
    id: 'X-02',
    name: 'Viper Coil',
    series: 'Venom Series',
    note: 'Emerald core / toxic glow lattice',
    src: asset('katanas/x02-ghost-alloy.svg'),
    accent: '34,197,94',
  },
  {
    id: 'X-03',
    name: 'Neon Shogun',
    series: 'Ceremony Series',
    note: 'Violet plasma line / ritual-grade finish',
    src: asset('katanas/x03-ronin-blackout.svg'),
    accent: '168,85,247',
  },
  {
    id: 'X-04',
    name: 'Ghost Alloy',
    series: 'Null Series',
    note: 'White alloy edge / frost-signal silence',
    src: asset('katanas/x04-neon-shogun.svg'),
    accent: '226,232,240',
  },
  {
    id: 'X-05',
    name: 'Solar Circuit',
    series: 'Crown Series',
    note: 'Amber charge line / royal heat bloom',
    src: asset('katanas/x05-blood-circuit.svg'),
    accent: '245,158,11',
  },
];

const buildNotes = [
  {
    id: '01',
    title: 'Visual Direction',
    body:
      'Ancient weapon silhouette, future-grade interface language, and a restrained red-on-black palette.',
  },
  {
    id: '02',
    title: 'Motion Language',
    body:
      'Scroll movement is treated like a draw sequence: slow tension, sudden flash, then controlled reveal.',
  },
  {
    id: '03',
    title: 'Portfolio Purpose',
    body:
      'The page exists to prove cinematic product storytelling, not to imitate a generic ecommerce template.',
  },
];

function playHover() {
  audio.playGlassTap();
}

function playClick() {
  audio.playBeep();
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
      className="relative h-[24vh] min-h-28 overflow-hidden bg-black md:h-[40vh] md:min-h-52"
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
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 md:text-[10px] md:tracking-[0.28em]">
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
          backgroundImage: `radial-gradient(circle at center, rgba(${accent}, 0.2), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))`,
        }}
        className={`flex items-center justify-center ${className}`}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            style={{ backgroundColor: `rgba(${accent}, 0.9)` }}
            className="h-24 w-px shadow-[0_0_18px_currentColor]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 md:tracking-[0.24em]">
            visual archive pending
          </span>
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
  const textOpacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const shakeX = useTransform(scrollYProgress, [0.12, 0.16, 0.2, 0.24, 0.3], [0, -10, 8, -6, 0]);
  const headingClip = useTransform(
    scrollYProgress,
    [0.24, 0.44],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[86vh] items-center justify-center overflow-hidden bg-black px-6 py-20 md:min-h-screen md:px-10 lg:px-16"
    >
      <motion.div
        style={{ x: shakeX }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_32%)]" />
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-white"
        />
        <motion.div
          style={{ scaleX: slashScale }}
          className="absolute left-[-10%] top-1/2 h-[2px] w-[120%] origin-center -translate-y-1/2 rotate-[-17deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_32px_rgba(248,113,113,0.95)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-md" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:text-[11px] md:tracking-[0.28em]">
          ARCHIVE SEAL BROKEN
        </span>
        <motion.h2
          style={{ clipPath: headingClip }}
          className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]"
        >
          X-01 ACCESS GRANTED
        </motion.h2>
      </motion.div>
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
      <AmbientField className="opacity-70" />

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
            In the lower cities of Neo-Tokyo, conflict ended before sound could escape. X-01 is a fictional relic built between ceremony and machine logic - a blade remembered before it is drawn.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/55"
        >
          <AmbientField className="opacity-45" />
          <motion.div
            style={{ scale: glowScale }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(220,38,38,0.16),transparent_34%)]"
          />

          <div className="relative min-h-[22rem] p-4 md:min-h-[32rem] md:p-6">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="h-full w-full"
            >
              <KatanaImage
                src={asset('katanas/blueprint-x01.svg')}
                alt="X-01 blueprint"
                priority
                accent="220,38,38"
                className="h-full w-full rounded-[1.4rem] object-cover object-center opacity-90"
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
      className="relative overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16"
    >
      <AmbientField className="opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_28%,rgba(220,38,38,0.12),transparent_26%)]" />

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
            Five sealed variants. One myth. Each blade carries a different signal, material language, and combat ritual.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlade.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/58"
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.65fr)]">
                <div
                  style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(${activeBlade.accent}, 0.24), transparent 42%)`,
                  }}
                  className="relative min-h-[28rem] overflow-hidden p-6 md:min-h-[42rem] md:p-8"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%,rgba(0,0,0,0.35)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.06)_1px,transparent_1px),radial-gradient(circle_at_60%_55%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:180px_180px] opacity-30" />
                  <motion.div
                    initial={{ x: '-120%' }}
                    animate={{ x: '120%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-md"
                  />
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

                <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
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
                      View Details
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
                      Acquire Active Blade
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-3">
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
                  className={`group relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/52 text-left transition-all duration-300 ${
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
                  <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-3 p-3">
                    <div
                      style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(${item.accent}, 0.18), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.32))`,
                      }}
                      className="relative h-20 overflow-hidden rounded-[0.9rem]"
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

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            CASE STUDY / ARCHIVE NOTE
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
            WHY THE EXPERIENCE HOLDS
          </h2>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {buildNotes.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.09 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/55 p-6"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.09 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-red-500 via-white/80 to-transparent"
              />
              <div className="mb-5 flex flex-col gap-3">
                <div className="flex items-end justify-between gap-3">
                  <span className="font-display text-5xl text-white/14">{card.id}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-500 md:tracking-[0.22em]">
                    CASE FILE
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
      </div>
    </section>
  );
}

function FinalCTA({ onOpenCheckout }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bloomScale = useTransform(scrollYProgress, [0.15, 0.85], [0.8, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16"
    >
      <AmbientField className="opacity-60" />
      <motion.div
        style={{ scale: bloomScale }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.18),transparent_28%),linear-gradient(180deg,#000_10%,rgba(0,0,0,0.94)_100%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-7"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:text-[11px] md:tracking-[0.28em]">
            FINAL TRANSMISSION
          </span>
          <motion.h2
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl uppercase tracking-[0.05em] text-white md:text-7xl md:tracking-[0.1em]"
          >
            BUILD WORLDS PEOPLE REMEMBER.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="max-w-2xl text-base leading-8 text-white/68 md:text-lg"
          >
            Cyber Katana X-01 is a fictional product experience built to showcase cinematic web design, motion language, and premium product storytelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                onOpenCheckout();
              }}
              className="inline-flex items-center justify-center gap-2 border border-red-500/45 bg-red-600/85 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white/55 hover:bg-white hover:text-black md:tracking-[0.28em]"
            >
              Start Project
            </button>
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                window.location.href = 'mailto:your@email.com';
              }}
              className="inline-flex items-center justify-center gap-2 border border-white/12 bg-white/[0.03] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-red-500/55 hover:bg-red-950/20 md:tracking-[0.28em]"
            >
              Contact Studio
            </button>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[30rem] md:min-h-[42rem]">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0"
          >
            <KatanaImage
              src={asset('katanas/final-silhouette.svg')}
              alt="Final X-01 silhouette"
              accent="220,38,38"
              className="h-full w-full object-contain object-right"
            />
          </motion.div>

          <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-red-400 md:tracking-[0.24em]">
            <Shield size={14} />
            portfolio ready
          </div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/48 md:tracking-[0.24em]">
            <ArrowRight size={14} className="text-red-400" />
            final transmission ready
          </div>
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
      />
    </>
  );
}
