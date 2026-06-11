import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const archiveItems = [
  {
    id: 'X-01',
    name: 'Azure Wraith',
    series: 'Signal Series',
    note: 'Electric blue edge / cold mist chamber',
    src: asset('katanas/x01-crimson-silence.webp'),
    accent: '59,130,246',
  },
  {
    id: 'X-02',
    name: 'Viper Coil',
    series: 'Venom Series',
    note: 'Emerald core / toxic glow lattice',
    src: asset('katanas/x02-ghost-alloy.webp'),
    accent: '34,197,94',
  },
  {
    id: 'X-03',
    name: 'Neon Shogun',
    series: 'Ceremony Series',
    note: 'Violet plasma line / ritual-grade finish',
    src: asset('katanas/x03-ronin-blackout.webp'),
    accent: '168,85,247',
  },
  {
    id: 'X-04',
    name: 'Ghost Alloy',
    series: 'Null Series',
    note: 'White alloy edge / frost-signal silence',
    src: asset('katanas/x04-neon-shogun.webp'),
    accent: '226,232,240',
  },
  {
    id: 'X-05',
    name: 'Solar Circuit',
    series: 'Crown Series',
    note: 'Amber charge line / royal heat bloom',
    src: asset('katanas/x05-blood-circuit.webp'),
    accent: '245,158,11',
  },
];

const caseStudyCards = [
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
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 md:tracking-[0.28em]">
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
  return (
    <section className="relative flex min-h-[86vh] items-center justify-center overflow-hidden bg-black px-6 py-20 md:min-h-screen md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_30%)]" />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.85, ease: [0.2, 1, 0.2, 1] }}
        className="absolute left-[-10%] top-1/2 h-[2px] w-[120%] origin-center -translate-y-1/2 rotate-[-17deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_32px_rgba(248,113,113,0.95)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:text-[11px] md:tracking-[0.32em]">
          archive seal broken
        </span>
        <h2 className="font-display text-4xl uppercase tracking-[0.06em] text-white md:text-6xl md:tracking-[0.12em]">
          X-01 Access Granted
        </h2>
      </motion.div>
    </section>
  );
}

function LoreScene() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_82%_74%,rgba(220,38,38,0.1),transparent_20%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:tracking-[0.28em]">
              memory layer / neo-tokyo
            </span>
            <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]">
              Not Forged For War.
              <br />
              Forged For Silence.
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-white/68 md:text-lg">
            In the lower cities of Neo-Tokyo, conflict ended before sound could escape. X-01 is a fictional relic built between ceremony and machine logic: a blade remembered before it is drawn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/55"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:38px_38px] opacity-18" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(220,38,38,0.14),transparent_34%)]" />

          <div className="relative min-h-[22rem] p-4 md:min-h-[32rem] md:p-6">
            <KatanaImage
              src={asset('katanas/blueprint-x01.webp')}
              alt="X-01 blueprint"
              priority
              accent="220,38,38"
              className="h-full w-full rounded-[1.4rem] object-cover object-center opacity-90"
            />

            <div className="absolute left-6 top-6 border-l border-red-500/55 pl-3 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 md:left-10 md:top-10 md:tracking-[0.24em]">
              Plasma edge stable
            </div>
            <div className="absolute bottom-6 right-6 border-r border-white/20 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 md:bottom-10 md:right-10 md:tracking-[0.24em]">
              Mag-lock sheath
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_28%,rgba(220,38,38,0.16),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:tracking-[0.28em]">
            blade archive / five active variants
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]">
            Blade Archive
          </h2>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <motion.div
            key={activeBlade.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
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
                  {activeBlade.series}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <span
                    style={{ color: `rgb(${activeBlade.accent})` }}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] md:tracking-[0.28em]"
                  >
                    active blade / {activeBlade.id}
                  </span>
                  <h3 className="font-display text-3xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
                    {activeBlade.name}
                  </h3>
                  <p className="text-base leading-8 text-white/66">{activeBlade.note}</p>
                </div>

                <div className="grid gap-4 text-sm text-white/48 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="border-t border-white/10 pt-4">
                    <div
                      style={{ color: `rgb(${activeBlade.accent})` }}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] md:tracking-[0.24em]"
                    >
                      Series
                    </div>
                    <div className="mt-2">{activeBlade.series}</div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div
                      style={{ color: `rgb(${activeBlade.accent})` }}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] md:tracking-[0.24em]"
                    >
                      Status
                    </div>
                    <div className="mt-2">Archive access granted</div>
                  </div>
                </div>

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
                  className={`group overflow-hidden rounded-[1.35rem] border text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-red-950/14 shadow-[0_0_22px_rgba(220,38,38,0.18)]'
                      : 'border-white/10 bg-black/52 hover:border-white/18'
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `rgba(${item.accent}, 0.45)`,
                          boxShadow: `0 0 22px rgba(${item.accent}, 0.16)`,
                        }
                      : undefined
                  }
                >
                  <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-4 p-3">
                    <div
                      style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(${item.accent}, 0.18), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.32))`,
                      }}
                      className="relative h-24 overflow-hidden rounded-[1rem]"
                    >
                      <KatanaImage
                        src={item.src}
                        alt={`${item.id} selector`}
                        accent={item.accent}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <span
                        style={{ color: `rgb(${item.accent})` }}
                        className="font-mono text-[9px] uppercase tracking-[0.14em] md:tracking-[0.22em]"
                      >
                        {item.id}
                      </span>
                      <span className="font-display text-xl uppercase tracking-[0.04em] text-white">
                        {item.name}
                      </span>
                      <span className="truncate text-sm text-white/46">{item.series}</span>
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

function CaseStudy() {
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
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:tracking-[0.28em]">
            case study / three core notes
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
            Case Study
          </h2>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {caseStudyCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-black/55 p-6"
            >
              <div className="mb-6 font-display text-5xl text-white/14">{card.id}</div>
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
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-20 md:px-10 md:py-24 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_32%),linear-gradient(180deg,#000_10%,rgba(0,0,0,0.94)_100%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-7"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:text-[11px] md:tracking-[0.28em]">
            final transmission
          </span>
          <h2 className="font-display text-5xl uppercase tracking-[0.05em] text-white md:text-7xl md:tracking-[0.1em]">
            Build Worlds People Remember.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            Cyber Katana X-01 is a fictional product experience built to showcase cinematic web design, motion language, and premium product storytelling.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/55"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_40%)]" />
          <div className="relative min-h-[30rem] p-6 md:min-h-[42rem] md:p-8">
            <KatanaImage
              src={asset('katanas/final-silhouette.webp')}
              alt="Final X-01 silhouette"
              className="h-full w-full object-contain"
            />

            <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-red-400 md:tracking-[0.24em]">
              <Shield size={14} />
              portfolio ready
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/48 md:tracking-[0.24em]">
              <ArrowRight size={14} className="text-red-400" />
              archive sequence complete
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ArchiveSections({ onOpenCheckout, onOpenSpecs }) {
  return (
    <>
      <ArchiveUnlock />
      <LoreScene />
      <BladeArchive
        onOpenCheckout={onOpenCheckout}
        onOpenSpecs={onOpenSpecs}
      />
      <CaseStudy />
      <FinalCTA onOpenCheckout={onOpenCheckout} />
    </>
  );
}
