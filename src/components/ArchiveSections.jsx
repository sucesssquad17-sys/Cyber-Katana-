import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Crosshair,
  Layers3,
  Radar,
  ScanLine,
  Shield,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import { audio } from '../utils/AudioEngine';

const blueprintImage = `${import.meta.env.BASE_URL}frames/frame_0180.webp`;

const collectionItems = [
  {
    id: 'x01',
    name: 'X-01 Crimson Silence',
    badge: 'Collector Series',
    line: 'Red plasma edge / first archive issue',
    image: blueprintImage,
    panelClass:
      'bg-[radial-gradient(circle_at_35%_78%,rgba(239,68,68,0.34),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.2))]',
    frameClass:
      'rotate-[15deg] scale-[1.14] translate-x-4 contrast-125 saturate-[1.55] brightness-110',
  },
  {
    id: 'x02',
    name: 'X-02 Ghost Alloy',
    badge: 'Stealth Series',
    line: 'White-blue blade / cold mist housing',
    image: blueprintImage,
    panelClass:
      'bg-[radial-gradient(circle_at_68%_18%,rgba(255,255,255,0.16),transparent_22%),linear-gradient(180deg,rgba(147,197,253,0.14),rgba(0,0,0,0.28))]',
    frameClass:
      'rotate-[9deg] scale-[1.08] -translate-x-2 grayscale brightness-[1.45] contrast-125',
  },
  {
    id: 'x03',
    name: 'X-03 Ronin Blackout',
    badge: 'Shadow Series',
    line: 'Matte blackout finish / covert balance',
    image: blueprintImage,
    panelClass:
      'bg-[radial-gradient(circle_at_50%_80%,rgba(220,38,38,0.18),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.4))]',
    frameClass:
      'rotate-[20deg] scale-[1.18] contrast-150 brightness-[0.78] saturate-[0.4]',
  },
  {
    id: 'x04',
    name: 'X-04 Neon Shogun',
    badge: 'Elite Series',
    line: 'Ceremonial cyber build / crimson crest',
    image: blueprintImage,
    panelClass:
      'bg-[radial-gradient(circle_at_72%_72%,rgba(217,70,239,0.28),transparent_22%),linear-gradient(180deg,rgba(244,63,94,0.16),rgba(0,0,0,0.28))]',
    frameClass:
      'rotate-[12deg] scale-[1.12] hue-rotate-[318deg] saturate-[1.6] brightness-110',
  },
  {
    id: 'x05',
    name: 'X-05 Blood Circuit',
    badge: 'Myth Series',
    line: 'Glowing vein lattice / sealed core protocol',
    image: blueprintImage,
    panelClass:
      'bg-[radial-gradient(circle_at_24%_28%,rgba(248,113,113,0.2),transparent_22%),linear-gradient(180deg,rgba(127,29,29,0.24),rgba(0,0,0,0.3))]',
    frameClass:
      'rotate-[18deg] scale-[1.15] brightness-105 contrast-125 saturate-[1.45]',
  },
];

const craftCards = [
  {
    id: '01',
    title: 'Carbon-Forged Grip',
    body: 'Weight memory calibrated for control, silence, and clean directional force.',
  },
  {
    id: '02',
    title: 'Titanium Cyber Sheath',
    body: 'Mag-lock draw housing shaped to release like ritual, not hardware.',
  },
  {
    id: '03',
    title: 'Plasma Edge Finish',
    body: 'A redline edge treatment tuned for afterimage, heat bloom, and presence.',
  },
  {
    id: '04',
    title: 'Silent Strike Core',
    body: 'The fictional power lattice that turns the X-01 into an archive legend.',
  },
];

const modes = [
  {
    id: 'display',
    title: 'Display Mode',
    copy: 'For collectors and visual showcase.',
    detail:
      'Ceremonial light, restrained glow, and museum-grade framing push the X-01 toward relic status.',
    icon: Layers3,
    accent: 'from-red-600/24 via-red-500/8 to-transparent',
    stats: [
      ['Glow Output', '92%'],
      ['Silhouette Contrast', '88%'],
      ['Ceremony Loop', '04 / active'],
    ],
  },
  {
    id: 'combat',
    title: 'Combat Simulation Mode',
    copy: 'Fictional HUD / training style.',
    detail:
      'Target overlays and kinetic readouts frame the blade like a machine built for precise endings.',
    icon: Radar,
    accent: 'from-red-700/30 via-orange-500/8 to-transparent',
    stats: [
      ['Target Sync', '97%'],
      ['Reaction Echo', '11 ms'],
      ['Threat Lattice', 'stable'],
    ],
  },
  {
    id: 'archive',
    title: 'Archive Mode',
    copy: 'Unlock lore, specs, and edition history.',
    detail:
      'Blueprint labels, edition tags, and memory-index fragments turn the page into a sealed file.',
    icon: ScanLine,
    accent: 'from-white/14 via-red-500/8 to-transparent',
    stats: [
      ['Lore Index', '239 entries'],
      ['Edition Trace', 'complete'],
      ['Blueprint Layer', 'unsealed'],
    ],
  },
];

const studioNotes = [
  {
    label: 'Visual Direction',
    text: 'Ancient weapon silhouette. Future-grade interface language.',
  },
  {
    label: 'Motion Design',
    text: 'Scroll, sound, and glow were tuned to make the blade feel awake.',
  },
  {
    label: 'Product Storytelling',
    text: 'The world is sold through ritual, scarcity, and classified detail.',
  },
  {
    label: 'Interaction Design',
    text: 'Every action is sharp, minimal, and deliberate.',
  },
];

const faqItems = [
  {
    question: 'Is Cyber Katana a real product?',
    answer:
      'Cyber Katana is a fictional premium product concept built as a cinematic landing page and portfolio case study.',
  },
  {
    question: 'What was the goal of this project?',
    answer:
      'To build a scroll-led product archive that merges futuristic branding, motion storytelling, and collectible presentation.',
  },
  {
    question: 'What technologies were used?',
    answer:
      'React, Vite, Tailwind CSS, Framer Motion, custom motion logic, and interactive UI components.',
  },
  {
    question: 'Can this style be used for real brands?',
    answer:
      'Yes. The same structure adapts well to product launches, gaming pages, collectibles, fashion drops, and premium tech showcases.',
  },
  {
    question: 'Is it mobile friendly?',
    answer:
      'Yes. Mobile keeps the cinematic tone, but uses lighter motion, simpler layouts, and readable full-width cards.',
  },
];

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function playHover() {
  audio.playGlassTap();
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-500/90 md:text-[11px] md:tracking-[0.42em]">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl uppercase tracking-[0.06em] text-white md:text-6xl md:tracking-[0.12em]">
        {title}
      </h2>
      {copy ? (
        <p className="max-w-2xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function BladeTransition() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const slashX = useTransform(scrollYProgress, [0.1, 0.78], ['-44%', '124%']);
  const slashOpacity = useTransform(scrollYProgress, [0.06, 0.16, 0.74, 0.94], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.22, 0.42, 0.82], [0, 1, 0.9]);
  const smokeOpacity = useTransform(scrollYProgress, [0.18, 0.56, 0.92], [0.12, 0.8, 0.18]);
  const shakeX = useTransform(scrollYProgress, [0.26, 0.33, 0.4, 0.47, 0.54], [0, -10, 8, -5, 0]);

  return (
    <section
      id="archive-unlock"
      ref={sectionRef}
      className="section-shell flex min-h-[78vh] items-center justify-center border-t-0 py-20 md:min-h-screen md:py-28"
    >
      <motion.div
        style={{ x: shakeX }}
        className="relative w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/8 bg-black/72 px-6 py-20 backdrop-blur-xl md:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_54%)]" />
        <motion.div
          style={{ opacity: smokeOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_32%_36%,rgba(255,255,255,0.1),transparent_20%),radial-gradient(circle_at_76%_68%,rgba(220,38,38,0.14),transparent_24%)] blur-3xl"
        />
        <motion.div
          style={{ x: slashX, opacity: slashOpacity }}
          className="absolute left-[-55%] top-1/2 h-[3px] w-[210%] -translate-y-1/2 rotate-[-18deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_44px_rgba(248,113,113,0.88)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-md" />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-5 text-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-500 md:text-[11px] md:tracking-[0.5em]">
            Slash Event / Memory Gate
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.06em] text-white md:text-7xl md:tracking-[0.14em]">
            The X-01 Archive Unlocked
          </h2>
          <p className="text-base text-white/62 md:text-lg">
            Archive seal broken. X-01 memory layer restored.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LoreSection() {
  const lines = ['Not forged for war.', 'Forged for silence.'];

  return (
    <section className="section-shell overflow-visible py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_14%,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_82%_72%,rgba(220,38,38,0.1),transparent_20%)]" />

      <div className="relative z-10 grid gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] lg:items-center">
        <div className="flex flex-col gap-8 md:gap-10">
          <SectionHeading
            eyebrow="Lore / Memory Layer"
            title="Not Forged For War. Forged For Silence."
            copy="A relic from a city where silence became the final weapon."
          />

          <div className="space-y-4">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="font-display text-3xl uppercase tracking-[0.05em] text-white md:text-4xl md:tracking-[0.1em]"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.78, delay: 0.12 }}
            className="max-w-xl text-base leading-8 text-white/72 md:text-lg"
          >
            In the lower cities of Neo-Tokyo, conflict was ended before sound could escape. The X-01 exists between ceremony and machine logic: a collector-grade blade designed to be remembered before it is ever drawn.
          </motion.p>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ['Origin', 'Neo-Tokyo lower sectors'],
              ['Class', 'Collector relic / memory restored'],
              ['Status', 'Archive access granted'],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-white/10 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 md:tracking-[0.3em]">
                  {label}
                </div>
                <div className="mt-2 text-sm text-white/58">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/72 p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.14),transparent_46%)]" />

          <div className="relative flex min-h-[520px] items-center justify-center">
            <div className="absolute inset-0 rounded-[1.7rem] border border-red-500/12" />
            <img
              src={blueprintImage}
              alt="Cyber Katana blueprint"
              className="w-[122%] max-w-none rotate-[22deg] pb-8 mix-blend-screen opacity-85 contrast-125 saturate-[0.72] grayscale"
            />

            <div className="absolute left-4 top-8 max-w-[180px] border-l border-red-500/55 pl-3 font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/95 md:left-6 md:tracking-[0.28em]">
              Edge channel / plasma feed stable
            </div>
            <div className="absolute right-4 top-24 max-w-[170px] border-r border-white/18 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/48 md:right-6 md:tracking-[0.24em]">
              Vector guard / ceremonial balance
            </div>
            <div className="absolute bottom-16 left-6 max-w-[180px] border-l border-white/18 pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/48 md:left-10 md:tracking-[0.24em]">
              Grip memory / zero-slip handling
            </div>
            <div className="absolute bottom-8 right-6 max-w-[190px] border-r border-red-500/55 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/95 md:right-8 md:tracking-[0.28em]">
              Sheath lock / silent release architecture
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CraftSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const blueprintY = useTransform(scrollYProgress, [0, 1], [40, -32]);
  const fileOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0.6, 1]);

  return (
    <section ref={sectionRef} className="section-shell relative py-0 lg:h-[200vh]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%),radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.12),transparent_28%)]" />

      <div className="relative z-10 py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Classified Build File"
              title="Silent System / Four Active Layers"
              copy="Every part of the X-01 is framed as a sealed build file: grip, edge, sheath, and core working as one quiet system."
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/72 p-6 md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.14),transparent_46%)]" />
              <motion.img
                style={{ y: blueprintY }}
                src={blueprintImage}
                alt="Craft detail katana"
                className="mx-auto w-[132%] max-w-none rotate-[92deg] mix-blend-screen opacity-80 contrast-125 saturate-[0.9] grayscale"
              />
            </div>
          </div>

          <motion.div
            style={{ opacity: fileOpacity }}
            className="grid gap-5"
          >
            {craftCards.map((card, index) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/62 px-6 py-6 md:px-7"
              >
                <div className="absolute right-4 top-1 font-display text-7xl leading-none text-white/[0.04] md:text-8xl">
                  {card.id}
                </div>
                <div className="relative z-10 flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-500 md:tracking-[0.34em]">
                    file {card.id}
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-white md:text-3xl md:tracking-[0.1em]">
                    {card.title}
                  </h3>
                  <p className="max-w-lg text-sm leading-7 text-white/62 md:text-base">
                    {card.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CollectionCarousel({ onOpenCheckout, onOpenSpecs }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const trackX = useTransform(scrollYProgress, [0, 1], ['12%', '-56%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.round(latest * (collectionItems.length - 1));
    setActiveIndex(Math.max(0, Math.min(collectionItems.length - 1, nextIndex)));
  });

  return (
    <section
      id="collection-archive"
      ref={sectionRef}
      className="section-shell relative py-0 lg:h-[220vh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(220,38,38,0.16),transparent_28%)]" />

      <div className="relative z-10 py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <SectionHeading
          eyebrow="Archive Variants"
          title="The Archive Scroll"
          copy="Five archived variants. One silhouette. Different rituals of light, material, and myth."
          align="center"
        />

        <div className="mt-5 hidden items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/38 md:tracking-[0.3em] lg:flex">
          center focus / vertical scroll controls horizontal drift
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="mx-auto hidden max-w-[1360px] lg:block perspective-1000">
            <motion.div style={{ x: trackX }} className="flex gap-8 py-6">
              {collectionItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.article
                    key={item.id}
                    whileHover={{ y: -10 }}
                    onMouseEnter={playHover}
                    className={`group flex w-[320px] shrink-0 flex-col rounded-[1.85rem] border p-5 transition-all duration-500 ${
                      isActive
                        ? 'border-red-500/50 bg-red-950/14 shadow-[0_0_40px_rgba(220,38,38,0.24)]'
                        : 'border-white/10 bg-black/60 opacity-55'
                    }`}
                    style={{
                      transform: `rotateY(${index < activeIndex ? 12 : index > activeIndex ? -12 : 0}deg) scale(${isActive ? 1.06 : 0.92})`,
                    }}
                  >
                    <div
                      className={`relative aspect-[9/16] overflow-hidden rounded-[1.45rem] border border-white/10 ${item.panelClass}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`h-[132%] w-[132%] max-w-none object-cover pb-10 mix-blend-screen transition-all duration-500 ${item.frameClass} ${isActive ? 'opacity-100' : 'opacity-78'}`}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_30%,rgba(0,0,0,0.36)_100%)]" />

                      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                        <span className="rounded-full border border-red-500/40 bg-black/55 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-red-400 md:tracking-[0.26em]">
                          {item.badge}
                        </span>
                        <Crosshair className="text-white/35" size={16} />
                      </div>

                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-white/50 md:tracking-[0.24em]">
                        <span>{item.id}</span>
                        <span>{isActive ? 'active archive' : 'sealed variant'}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-1 flex-col gap-2">
                      <h3 className="font-display text-[1.65rem] uppercase tracking-[0.05em] text-white md:tracking-[0.08em]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/54">{item.line}</p>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onMouseEnter={playHover}
                        onClick={() => {
                          audio.playBeep();
                          onOpenSpecs();
                        }}
                        className="cyber-button cyber-button--ghost flex-1 px-4 py-3 text-[10px]"
                      >
                        View
                      </button>
                      <button
                        onMouseEnter={playHover}
                        onClick={() => {
                          audio.playBeep();
                          onOpenCheckout();
                        }}
                        className="cyber-button flex-1 px-4 py-3 text-[10px]"
                      >
                        Acquire
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:hidden">
            <div className="flex w-max snap-x snap-mandatory gap-4">
              {collectionItems.map((item) => (
                <article
                  key={item.id}
                  className="blade-panel w-[82vw] snap-center rounded-[1.5rem] p-4 sm:w-[22rem]"
                >
                  <div
                    className={`relative aspect-[9/16] overflow-hidden rounded-[1.3rem] border border-white/10 ${item.panelClass}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`h-[130%] w-[130%] max-w-none object-cover pb-10 mix-blend-screen ${item.frameClass}`}
                    />
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="rounded-full border border-red-500/40 bg-black/55 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-red-400">
                        {item.badge}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/48">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-7 text-white/56">{item.line}</p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        audio.playBeep();
                        onOpenSpecs();
                      }}
                      className="cyber-button cyber-button--ghost flex-1 px-4 py-3 text-[10px]"
                    >
                      View
                    </button>
                    <button
                      onMouseEnter={playHover}
                      onClick={() => {
                        audio.playBeep();
                        onOpenCheckout();
                      }}
                      className="cyber-button flex-1 px-4 py-3 text-[10px]"
                    >
                      Acquire
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeShowcase() {
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <section className="section-shell">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_46%,rgba(220,38,38,0.12),transparent_28%)]" />

      <div className="relative z-10 grid gap-10 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Mode Select / HUD Layer"
            title="Choose Your Blade Mode"
            copy="Three ways to frame the same relic: display, simulation, and archive recall."
          />

          <div className="grid gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode.id === mode.id;

              return (
                <button
                  key={mode.id}
                  onMouseEnter={() => {
                    playHover();
                    setActiveMode(mode);
                  }}
                  onClick={() => {
                    audio.playBeep();
                    setActiveMode(mode);
                  }}
                  className={`rounded-[1.35rem] border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-red-500/45 bg-red-950/14'
                      : 'border-white/10 bg-black/44'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:tracking-[0.3em]">
                        mode select
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-white md:tracking-[0.08em]">
                        {mode.title}
                      </h3>
                      <p className="text-sm leading-7 text-white/54">{mode.copy}</p>
                    </div>
                    <Icon className={isActive ? 'text-red-400' : 'text-white/38'} size={20} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeMode.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/64 p-7 md:p-10"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${activeMode.accent}`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-500 md:text-[11px] md:tracking-[0.34em]">
                Live Preview
              </span>
              <h3 className="font-display text-4xl uppercase tracking-[0.06em] text-white md:text-5xl md:tracking-[0.12em]">
                {activeMode.title}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-white/70">
                {activeMode.detail}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_250px] lg:items-end">
              <div className="relative flex min-h-[290px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/55">
                <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent_45%)]" />
                <img
                  src={blueprintImage}
                  alt={activeMode.title}
                  className={`w-[145%] max-w-none rotate-[16deg] pb-10 mix-blend-screen ${
                    activeMode.id === 'display'
                      ? 'contrast-125 saturate-[1.35]'
                      : activeMode.id === 'combat'
                        ? 'contrast-150 saturate-[1.5] brightness-110'
                        : 'grayscale brightness-[1.18] contrast-125'
                  }`}
                />

                <div className="absolute left-5 top-5 rounded-full border border-red-500/35 bg-black/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-red-400 md:tracking-[0.24em]">
                  {activeMode.id.toUpperCase()}
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55 md:tracking-[0.24em]">
                  <Waypoints size={14} />
                  profile synced
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {activeMode.stats.map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.34, delay: index * 0.08 }}
                    className="rounded-[1.25rem] border border-white/10 bg-black/45 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/44 md:tracking-[0.26em]">
                        {label}
                      </span>
                      <span className="font-display text-xl uppercase tracking-[0.04em] text-white md:tracking-[0.08em]">
                        {value}
                      </span>
                    </div>
                    <div className="mt-3 h-px w-full bg-white/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="h-px origin-left bg-gradient-to-r from-red-500 to-white"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StudioNotes() {
  return (
    <section id="studio-notes" className="section-shell border-t border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_22%)] py-20">
      <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:items-start">
        <SectionHeading
          eyebrow="Studio Notes"
          title="Case Study Fragments"
          copy="A short breakdown of the visual, motion, and interaction decisions behind the X-01 experience."
        />

        <div className="grid gap-4">
          {studioNotes.map((note, index) => (
            <motion.article
              key={note.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.35rem] border border-white/8 bg-black/32 px-5 py-5"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-500 md:tracking-[0.3em]">
                  {note.label}
                </span>
                <Sparkles className="text-white/24" size={15} />
              </div>
              <p className="text-base leading-8 text-white/72">{note.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-shell py-16 md:py-20">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <SectionHeading
          eyebrow="Project Intel"
          title="FAQ"
          copy="Compact answers for the parts of the project that need plain language."
        />

        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/50">
                <button
                  onClick={() => {
                    audio.playBeep();
                    setOpenIndex(isOpen ? -1 : index);
                  }}
                  onMouseEnter={playHover}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-xl uppercase tracking-[0.04em] text-white md:text-2xl md:tracking-[0.08em]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-red-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-base leading-8 text-white/68">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onOpenSpecs }) {
  return (
    <section className="section-shell flex min-h-screen items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_34%),linear-gradient(180deg,#000_10%,rgba(0,0,0,0.94)_100%)]" />
      <div className="hud-grid absolute inset-0 opacity-18" />
      <div className="noise-overlay absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:items-center">
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-500 md:text-[11px] md:tracking-[0.44em]">
            Final Transmission
          </span>
          <h2 className="font-display text-5xl uppercase tracking-[0.06em] text-white md:text-7xl md:tracking-[0.14em]">
            Build Worlds People Remember.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            Cyber Katana X-01 is a fictional product landing page built to showcase cinematic web design, motion language, storytelling, and premium product presentation.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onMouseEnter={playHover}
              onClick={() => {
                audio.playBeep();
                onOpenSpecs();
              }}
              className="cyber-button px-6 py-4 text-[10px]"
            >
              View Project
            </button>
            <button
              onMouseEnter={playHover}
              onClick={() => {
                audio.playBeep();
                window.location.href = 'mailto:your@email.com';
              }}
              className="cyber-button cyber-button--ghost px-6 py-4 text-[10px]"
            >
              Contact Studio
            </button>
            <button
              onMouseEnter={playHover}
              onClick={() => {
                audio.playBeep();
                scrollToId('collection-archive');
              }}
              className="cyber-button cyber-button--ghost px-6 py-4 text-[10px]"
            >
              Explore Archive
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_42%)]" />
          <div className="absolute inset-0 animate-[spin_38s_linear_infinite] rounded-[2rem] border border-red-500/10" />

          <div className="relative flex min-h-[520px] items-center justify-center">
            <img
              src={blueprintImage}
              alt="Cyber Katana final silhouette"
              className="w-[158%] max-w-none rotate-[14deg] pb-10 mix-blend-screen opacity-95 contrast-125 saturate-[1.35]"
            />

            <div className="absolute inset-x-8 top-8 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-red-400 md:text-[10px] md:tracking-[0.26em]">
              <span>Project type / cinematic case study</span>
              <span className="text-white/40">status / unlocked</span>
            </div>

            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 md:text-[10px] md:tracking-[0.24em]">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-red-400" />
                portfolio ready
              </span>
              <span className="flex items-center gap-2">
                <ArrowRight size={14} className="text-red-400" />
                archive sequence complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ArchiveSections({ onOpenCheckout, onOpenSpecs }) {
  return (
    <>
      <BladeTransition />
      <LoreSection />
      <CraftSection />
      <CollectionCarousel
        onOpenCheckout={onOpenCheckout}
        onOpenSpecs={onOpenSpecs}
      />
      <ModeShowcase />
      <StudioNotes />
      <FAQSection />
      <FinalCTA onOpenSpecs={onOpenSpecs} />
    </>
  );
}
