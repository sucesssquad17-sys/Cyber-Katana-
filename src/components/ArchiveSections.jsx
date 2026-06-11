import { useMemo, useRef, useState } from 'react';
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

const collectionItems = [
  {
    id: 'x01',
    name: 'X-01 Crimson Silence',
    badge: 'Collector Series',
    line: 'Red plasma edge / first archive issue',
    filter: 'contrast-125 saturate-150 brightness-110',
  },
  {
    id: 'x02',
    name: 'X-02 Ghost Alloy',
    badge: 'Stealth Series',
    line: 'White-blue blade / zero-noise sheath',
    filter: 'grayscale brightness-150 contrast-125',
  },
  {
    id: 'x03',
    name: 'X-03 Ronin Blackout',
    badge: 'Shadow Series',
    line: 'Matte blackout finish / covert balance',
    filter: 'grayscale brightness-75 contrast-150',
  },
  {
    id: 'x04',
    name: 'X-04 Neon Shogun',
    badge: 'Elite Series',
    line: 'Ceremonial cyber build / neon crest',
    filter: 'hue-rotate-[315deg] saturate-150 brightness-125',
  },
];

const craftCards = [
  {
    title: 'Carbon-Forged Grip',
    body: 'Engineered for control, balance, and cinematic precision.',
    align: 'left',
    connector: 'top-[29%] left-[25%] w-24',
  },
  {
    title: 'Titanium Cyber Sheath',
    body: 'Magnetic lock system with instant release styling.',
    align: 'right',
    connector: 'top-[39%] right-[25%] w-24',
  },
  {
    title: 'Plasma Edge Finish',
    body: 'A neon-red blade treatment made for visual impact.',
    align: 'left',
    connector: 'bottom-[31%] left-[25%] w-20',
  },
  {
    title: 'Silent Strike Core',
    body: 'The fictional power system behind the X-01 identity.',
    align: 'right',
    connector: 'bottom-[23%] right-[25%] w-20',
  },
];

const modes = [
  {
    id: 'display',
    title: 'Display Mode',
    copy: 'For collectors and visual showcase.',
    detail:
      'Museum-grade lighting, ceremonial camera framing, and restrained red pulse patterns built for a premium shelf presence.',
    icon: Layers3,
    accent: 'from-red-600/25 via-red-500/10 to-transparent',
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
      'Vector targets, kinetic overlays, and mission-room telemetry reframe the same blade as a precision instrument.',
    icon: Radar,
    accent: 'from-red-700/35 via-orange-500/10 to-transparent',
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
      'Annotated callouts, blueprint metadata, and edition taxonomy turn the page into an interactive dossier.',
    icon: ScanLine,
    accent: 'from-white/15 via-red-500/10 to-transparent',
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
    text:
      'The X-01 design language was built around contrast: ancient silhouette, future-grade interface.',
  },
  {
    label: 'Motion Design',
    text:
      'Every animation was tuned to feel like the blade is waking up, not simply moving on command.',
  },
  {
    label: 'Product Storytelling',
    text:
      'The page treats the object like a mythological artifact first and a product second.',
  },
  {
    label: 'Interaction Design',
    text:
      'The archive flow replaces store logic with reveal logic so the visit feels curated instead of transactional.',
  },
];

const faqItems = [
  {
    question: 'Is Cyber Katana a real product?',
    answer:
      'Cyber Katana is a fictional premium product concept designed as a portfolio landing page experience.',
  },
  {
    question: 'What was the goal of this project?',
    answer:
      'To create a cinematic, scroll-driven product showcase with futuristic branding, storytelling, and interactive presentation.',
  },
  {
    question: 'What technologies were used?',
    answer:
      'React, Vite, Tailwind CSS, Framer Motion, custom motion logic, and interactive UI components.',
  },
  {
    question: 'Can this style be used for real brands?',
    answer:
      'Yes. The same structure adapts cleanly to product launches, gaming pages, collectibles, fashion drops, and tech portfolios.',
  },
  {
    question: 'Is it mobile friendly?',
    answer:
      'The layout stacks into a simpler presentation on mobile, with reduced effects, touch-friendly cards, and lighter motion.',
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
    <div className={`flex flex-col gap-5 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.42em] text-red-500/90">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl uppercase tracking-[0.12em] text-white md:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-sm uppercase tracking-[0.24em] text-white/52 md:text-base">
        {copy}
      </p>
    </div>
  );
}

function BladeTransition() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const slashX = useTransform(scrollYProgress, [0.12, 0.8], ['-48%', '126%']);
  const slashOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.72, 0.92], [0, 1, 1, 0]);
  const smokeOpacity = useTransform(scrollYProgress, [0.2, 0.55, 0.92], [0.15, 0.75, 0.2]);
  const textOpacity = useTransform(scrollYProgress, [0.24, 0.46, 0.82], [0, 1, 0.9]);
  const shakeX = useTransform(scrollYProgress, [0.28, 0.34, 0.4, 0.46, 0.52], [0, -12, 8, -6, 0]);

  return (
    <section
      id="archive-unlock"
      ref={sectionRef}
      className="section-shell flex min-h-screen items-center justify-center py-28"
    >
      <div className="hud-grid absolute inset-0 opacity-30" />
      <div className="noise-overlay absolute inset-0 opacity-70" />
      <motion.div
        style={{ x: shakeX }}
        className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 px-6 py-20 backdrop-blur-xl md:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_58%)]" />
        <motion.div
          style={{ opacity: smokeOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_32%_40%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_72%_65%,rgba(220,38,38,0.16),transparent_24%)] blur-3xl"
        />
        <motion.div
          style={{ x: slashX, opacity: slashOpacity }}
          className="absolute left-[-55%] top-1/2 h-[3px] w-[210%] -translate-y-1/2 rotate-[-18deg] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_45px_rgba(248,113,113,0.9)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-md" />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-7 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.55em] text-red-500">
            Blade Flash / Archive Handshake
          </span>
          <h2 className="font-display text-4xl uppercase tracking-[0.16em] text-white md:text-7xl">
            The X-01 Archive Unlocked
          </h2>
          <p className="max-w-3xl text-sm uppercase tracking-[0.28em] text-white/55 md:text-base">
            Hero ends. The blade cuts through the screen. The portfolio world opens behind it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LoreSection() {
  const lines = [
    'Not forged for war.',
    'Forged for silence.',
  ];

  return (
    <section className="section-shell">
      <div className="hud-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,0.18),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_18%)]" />

      <div className="relative z-10 grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Lore / Story Layer"
            title="Not Forged For War. Forged For Silence."
            copy="A portfolio page should feel like a world with rules, memory, and atmosphere. This section gives the blade a myth to inhabit."
          />

          <div className="space-y-5">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.75, delay: index * 0.12 }}
                className="font-display text-3xl uppercase tracking-[0.12em] text-white md:text-4xl"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl text-base leading-8 text-white/70 md:text-lg"
          >
            In the lower cities of Neo-Tokyo, weapons were no longer made to be seen. They were made to end conflict before sound could escape. The Cyber Katana X-01 was designed as a collector-grade relic from that future: part blade, part machine, part myth.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
          className="blade-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_48%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />

          <div className="relative flex min-h-[520px] items-center justify-center">
            <div className="absolute inset-0 rounded-[1.5rem] border border-red-500/20" />
            <img
              src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
              alt="Cyber Katana blueprint"
              className="w-[130%] max-w-none rotate-[22deg] pb-10 mix-blend-screen opacity-95 contrast-125 saturate-[1.35]"
            />

            <div className="absolute left-6 top-8 max-w-[180px] border-l border-red-500/50 pl-3 font-mono text-[10px] uppercase tracking-[0.28em] text-red-400/90">
              Edge Channel / plasma feed stabilized
            </div>
            <div className="absolute right-6 top-24 max-w-[170px] border-r border-white/20 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
              Tsuba Vector Guard / ceremonial balance
            </div>
            <div className="absolute bottom-14 left-10 max-w-[190px] border-l border-white/20 pl-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
              Carbon-forged grip / zero-slip handling
            </div>
            <div className="absolute bottom-8 right-8 max-w-[180px] border-r border-red-500/50 pr-3 text-right font-mono text-[10px] uppercase tracking-[0.28em] text-red-400/90">
              Mag-lock sheath / silent release architecture
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

  const leftCardX = useTransform(scrollYProgress, [0.08, 0.28], [-120, 0]);
  const rightCardX = useTransform(scrollYProgress, [0.18, 0.38], [120, 0]);
  const lowerLeftX = useTransform(scrollYProgress, [0.42, 0.64], [-120, 0]);
  const lowerRightX = useTransform(scrollYProgress, [0.54, 0.76], [120, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.06, 0.2, 0.82], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="section-shell relative py-0 lg:h-[220vh]">
      <div className="hud-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_42%)]" />

      <div className="relative z-10 py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <SectionHeading
          eyebrow="Craft / Engineering Language"
          title="Crafted Like An Artifact"
          copy="This replaces generic feature bullets with a central hero object and connected premium callouts."
          align="center"
        />

        <div className="relative mt-16 hidden min-h-[620px] items-center justify-center lg:flex">
          <div className="absolute inset-0 mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-white/[0.02] backdrop-blur-sm" />
          <div className="absolute inset-y-14 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-red-500/25 to-transparent" />

          <div className="relative z-10 flex h-[520px] w-[320px] items-center justify-center rounded-[1.75rem] border border-red-500/20 bg-black/70">
            <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_45%)]" />
            <img
              src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
              alt="Craft detail katana"
              className="w-[155%] max-w-none rotate-[88deg] mix-blend-screen contrast-125 saturate-[1.3]"
            />
          </div>

          <motion.article
            style={{ x: leftCardX, opacity: cardOpacity }}
            className="absolute left-0 top-[18%] w-72 blade-panel p-6"
          >
            <CraftCard {...craftCards[0]} />
          </motion.article>
          <motion.article
            style={{ x: rightCardX, opacity: cardOpacity }}
            className="absolute right-0 top-[28%] w-72 blade-panel p-6"
          >
            <CraftCard {...craftCards[1]} />
          </motion.article>
          <motion.article
            style={{ x: lowerLeftX, opacity: cardOpacity }}
            className="absolute bottom-[22%] left-4 w-72 blade-panel p-6"
          >
            <CraftCard {...craftCards[2]} />
          </motion.article>
          <motion.article
            style={{ x: lowerRightX, opacity: cardOpacity }}
            className="absolute bottom-[14%] right-4 w-72 blade-panel p-6"
          >
            <CraftCard {...craftCards[3]} />
          </motion.article>

          {craftCards.map((card) => (
            <div
              key={card.title}
              className={`pointer-events-none absolute h-px bg-gradient-to-r from-red-500/60 to-transparent ${card.connector}`}
            />
          ))}
        </div>

        <div className="mt-14 grid gap-5 lg:hidden">
          <div className="blade-panel flex min-h-[320px] items-center justify-center overflow-hidden rounded-[1.75rem] p-4">
            <img
              src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
              alt="Craft detail katana"
              className="w-[160%] max-w-none rotate-[20deg] mix-blend-screen contrast-125 saturate-[1.3]"
            />
          </div>

          {craftCards.map((card) => (
            <article key={card.title} className="blade-panel rounded-[1.5rem] p-6">
              <CraftCard {...card} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftCard({ title, body }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-red-500">
        craftsmanship
      </span>
      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
        {title}
      </h3>
      <p className="text-sm leading-7 text-white/62">{body}</p>
    </div>
  );
}

function CollectionCarousel({ onOpenCheckout, onOpenSpecs }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const repeatedItems = useMemo(
    () => [...collectionItems, ...collectionItems],
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const trackX = useTransform(scrollYProgress, [0, 1], ['4%', '-48%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      collectionItems.length - 1,
      Math.floor(latest * collectionItems.length),
    );
    setActiveIndex(nextIndex);
  });

  return (
    <section
      id="collection-archive"
      ref={sectionRef}
      className="section-shell relative py-0 lg:h-[220vh]"
    >
      <div className="hud-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(220,38,38,0.14),transparent_30%)]" />

      <div className="relative z-10 py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <SectionHeading
          eyebrow="Collection / Archive Carousel"
          title="The Archive Scroll"
          copy="A collectible showcase, not a store grid. Vertical scroll drives the horizontal reveal and keeps the center card in focus."
          align="center"
        />

        <div className="mt-12 overflow-hidden">
          <div className="mx-auto hidden max-w-7xl lg:block perspective-1000">
            <motion.div style={{ x: trackX }} className="flex gap-8 py-6">
              {repeatedItems.map((item, index) => {
                const isActive = item.id === collectionItems[activeIndex].id;

                return (
                  <motion.article
                    key={`${item.id}-${index}`}
                    whileHover={{ y: -10 }}
                    onMouseEnter={playHover}
                    className={`group flex w-[290px] shrink-0 flex-col rounded-[1.75rem] border p-5 transition-all duration-500 ${
                      isActive
                        ? 'border-red-500/50 bg-red-950/18 shadow-[0_0_35px_rgba(220,38,38,0.22)]'
                        : 'border-white/10 bg-black/65 opacity-65 blur-[0.2px]'
                    }`}
                    style={{
                      transform: `rotateY(${index % 2 === 0 ? -11 : 11}deg)`,
                    }}
                  >
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]">
                      <img
                        src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
                        alt={item.name}
                        className={`h-[132%] w-[132%] max-w-none rotate-[18deg] object-cover pb-10 mix-blend-screen transition-all duration-500 ${item.filter} ${isActive ? 'scale-[1.05]' : 'scale-100 opacity-80'}`}
                      />
                      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                        <span className="rounded-full border border-red-500/40 bg-black/55 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-red-400">
                          {item.badge}
                        </span>
                        <Crosshair className="text-white/35" size={16} />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-1 flex-col gap-3">
                      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.22em] text-white/48">
                        {item.line}
                      </p>
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

          <div className="grid gap-5 lg:hidden">
            {collectionItems.map((item) => (
              <article key={item.id} className="blade-panel rounded-[1.5rem] p-4">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.3rem] border border-white/10">
                  <img
                    src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
                    alt={item.name}
                    className={`h-[130%] w-[130%] max-w-none rotate-[16deg] object-cover pb-10 mix-blend-screen ${item.filter}`}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-red-400">
                    {item.badge}
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/52">{item.line}</p>
                </div>
              </article>
            ))}
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
      <div className="hud-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_38%)]" />

      <div className="relative z-10 grid gap-10 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Interaction / Showcase"
            title="Choose Your Blade Mode"
            copy="Hover or tap a mode to change the mood of the page and show how the same artifact can be framed three different ways."
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
                  className={`blade-panel rounded-[1.4rem] p-5 text-left transition-all duration-300 ${
                    isActive ? 'border-red-500/45 bg-red-950/15' : 'border-white/10 bg-black/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-red-500">
                        mode select
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
                        {mode.title}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.18em] text-white/52">
                        {mode.copy}
                      </p>
                    </div>
                    <Icon className={isActive ? 'text-red-400' : 'text-white/40'} size={20} />
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
          transition={{ duration: 0.45 }}
          className="blade-panel relative min-h-[560px] overflow-hidden rounded-[2rem] p-7 md:p-10"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${activeMode.accent}`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.36em] text-red-500">
                Live Preview
              </span>
              <h3 className="font-display text-4xl uppercase tracking-[0.12em] text-white md:text-5xl">
                {activeMode.title}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-white/70">
                {activeMode.detail}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_260px] lg:items-end">
              <div className="relative flex min-h-[280px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/55">
                <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.22),transparent_46%)]" />
                <img
                  src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
                  alt={activeMode.title}
                  className={`w-[145%] max-w-none rotate-[16deg] pb-10 mix-blend-screen ${
                    activeMode.id === 'display'
                      ? 'contrast-125 saturate-[1.35]'
                      : activeMode.id === 'combat'
                        ? 'contrast-150 saturate-[1.5] brightness-110'
                        : 'grayscale brightness-125 contrast-125'
                  }`}
                />

                <div className="absolute left-5 top-5 rounded-full border border-red-500/35 bg-black/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-red-400">
                  {activeMode.id.toUpperCase()}
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/55">
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
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="rounded-[1.25rem] border border-white/10 bg-black/45 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                        {label}
                      </span>
                      <span className="font-display text-xl uppercase tracking-[0.08em] text-white">
                        {value}
                      </span>
                    </div>
                    <div className="mt-3 h-px w-full bg-white/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
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
    <section id="studio-notes" className="section-shell">
      <div className="hud-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(220,38,38,0.12),transparent_22%),radial-gradient(circle_at_84%_74%,rgba(255,255,255,0.08),transparent_16%)]" />

      <div className="relative z-10 flex flex-col gap-12">
        <SectionHeading
          eyebrow="Studio Notes / Social Proof"
          title="The Project Notes"
          copy="For a portfolio piece, credibility comes from design intent, motion rationale, and storytelling clarity rather than fake customer claims."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {studioNotes.map((note, index) => (
            <motion.article
              key={note.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="blade-panel rounded-[1.5rem] p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-red-500">
                  {note.label}
                </span>
                <Sparkles className="text-white/30" size={16} />
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
    <section id="faq" className="section-shell">
      <div className="hud-grid absolute inset-0 opacity-20" />
      <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        <SectionHeading
          eyebrow="FAQ / Project Context"
          title="Short Answers, Clean Frame"
          copy="Keep the explanation tight so the work stays cinematic while the intent stays clear."
        />

        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="blade-panel overflow-hidden rounded-[1.35rem]">
                <button
                  onClick={() => {
                    audio.playBeep();
                    setOpenIndex(isOpen ? -1 : index);
                  }}
                  onMouseEnter={playHover}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-display text-xl uppercase tracking-[0.08em] text-white md:text-2xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-red-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-base leading-8 text-white/68">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_34%),linear-gradient(180deg,#000_10%,rgba(0,0,0,0.92)_100%)]" />
      <div className="hud-grid absolute inset-0 opacity-25" />
      <div className="noise-overlay absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center">
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-red-500">
            Final Transmission
          </span>
          <h2 className="font-display text-5xl uppercase tracking-[0.14em] text-white md:text-7xl">
            Build Worlds People Remember.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            Cyber Katana X-01 is a fictional product landing page created to showcase cinematic web design, motion storytelling, and interactive product presentation.
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
                scrollToId('studio-notes');
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

        <div className="blade-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_42%)]" />
          <div className="absolute inset-0 animate-[spin_38s_linear_infinite] rounded-[2rem] border border-red-500/10" />
          <div className="relative flex min-h-[520px] items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}frames/frame_0180.webp`}
              alt="Cyber Katana final silhouette"
              className="w-[158%] max-w-none rotate-[14deg] pb-10 mix-blend-screen opacity-95 contrast-125 saturate-[1.35]"
            />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-red-400">
              <span>Project Type / concept landing page</span>
              <span className="text-white/40">status / unlocked</span>
            </div>
            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
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
      <FinalCTA
        onOpenSpecs={onOpenSpecs}
      />
    </>
  );
}
