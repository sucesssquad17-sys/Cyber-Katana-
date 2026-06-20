import { useRef, useState, useEffect, memo } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Cpu, Layers, Activity } from 'lucide-react';
import { audio } from '../utils/AudioEngine';
import { KATANAS } from '../utils/katanasData';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const buildNotes = [
  {
    id: '01',
    title: 'Design',
    body: 'Clean, modern aesthetic with a dark theme that puts the product front and center before reading any text.',
  },
  {
    id: '02',
    title: 'Animations',
    body: 'Smooth scrolling animations that reveal content as you move down the page, creating an engaging experience.',
  },
  {
    id: '03',
    title: 'Storytelling',
    body: 'The product is presented with an engaging background story to capture attention rather than a standard store layout.',
  },
  {
    id: '04',
    title: 'Sound Effects',
    body: 'Interactive sound effects play as you scroll and interact with the page, making the site feel alive.',
  },
  {
    id: '05',
    title: 'Product Variants',
    body: 'Multiple product options, each with unique colors and details for users to explore and choose from.',
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.03),transparent_30%),radial-gradient(circle_at_74%_36%,rgba(220,38,38,0.05),transparent_30%)]" />
      </div>
    );
  }

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

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = '', onClick, style, onMouseEnter }) {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1);
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={onMouseEnter}
      style={style}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function RevealText({ text, className = '', delayOffset = 0 }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delayOffset * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(4px)',
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: '0.25em' }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
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


function LoreScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageY = useTransform(scrollYProgress, [0.08, 0.32], [64, -64]);
  const scanY = useTransform(scrollYProgress, [0.1, 0.3], ['-10%', '110%']);
  const imageScale = useTransform(scrollYProgress, [0.08, 0.32], [1.18, 1.02]);
  const glowScale = useTransform(scrollYProgress, [0.08, 0.32], [0.85, 1.15]);

  // Disable motion calculations on mobile for better performance
  const imageYVal = isMobile ? 0 : imageY;
  const imageScaleVal = isMobile ? 1.05 : imageScale;
  const glowScaleVal = isMobile ? 1.0 : glowScale;
  const scanYVal = isMobile ? '50%' : scanY;

  return (
    <section
      ref={ref}
      id="lore-scene"
      className="relative overflow-x-clip bg-black px-6 py-12 md:px-10 md:py-20 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_55%,rgba(220,38,38,0.065),transparent_48%)]" />
      <AmbientField className="opacity-30" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-red-500">
              BACKGROUND STORY
            </span>
            <div className="space-y-1">
              <RevealText
                text="BUILT FOR DISPLAY."
                className="font-display text-2xl uppercase leading-[1.1] tracking-normal text-white sm:text-3xl md:text-4xl"
                delayOffset={0}
              />
              <RevealText
                text="MADE WITH PRECISION."
                className="font-display text-2xl uppercase leading-[1.1] tracking-normal text-white/50 sm:text-3xl md:text-4xl"
                delayOffset={0.2}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md text-xs md:text-sm leading-relaxed text-white/60"
          >
            These cybernetic katana concepts represent a merger of classic craftsmanship and state-of-the-art neon plasma science. Each piece is designed as a premium collector's reservation item.
          </motion.p>

          {/* Quote block */}
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="my-1 border-l-2 border-red-500/40 py-1 pl-3"
          >
            <p className="font-mono text-[11px] md:text-xs italic leading-relaxed text-white/40">
              &ldquo;Traditional bushido principles, forged directly into the quantum light spectrum.&rdquo;
            </p>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-widest text-red-500/70">
              — DESIGN INSPIRATION
            </span>
          </motion.blockquote>

          {/* Stat chips */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
            }}
            className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {[
              { label: 'AVG LENGTH', value: '72CM' },
              { label: 'CORES', value: 'QUANTUM/PLASMA' },
              { label: 'AVG WEIGHT', value: '1.2KG' },
              { label: 'RARITY', value: 'MYTHIC / ELITE' },
              { label: 'RESERVATION', value: 'OPEN' },
              { label: 'GLOW ENGINE', value: 'ION PLASMA' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex flex-col border-l-2 border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <span className="font-mono text-[8px] uppercase tracking-widest text-red-500/80">{stat.label}</span>
                <span className="font-mono text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-white/90 mt-0.5">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.12)', boxShadow: '0 0 30px rgba(220,38,38,0.1)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="relative w-full overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-crosshair rounded-2xl"
        >
          <motion.div
            style={{ scale: glowScaleVal }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(220,38,38,0.12),transparent_40%)] pointer-events-none"
          />

          <div className="relative h-[220px] xs:h-[280px] sm:h-[360px] md:h-[300px] lg:h-[380px] p-4 flex items-center justify-center">
            <motion.div
              style={{ y: imageYVal, scale: imageScaleVal }}
              className="h-full w-full flex items-center justify-center"
            >
              <KatanaImage
                src={asset('katanas/blueprint-x01.webp')}
                alt="X-01 blueprint"
                priority
                accent="220,38,38"
                className="h-full w-full object-contain opacity-70 mix-blend-screen select-none pointer-events-none"
              />
            </motion.div>

            <motion.div
              style={{ y: scanYVal }}
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
            >
              <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            </motion.div>

            <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400/80 md:left-6 md:top-6">
              <div className="h-px w-3 bg-red-500/50" />
              GLOWING BLADE
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 md:bottom-6 md:right-6">
              MAGNETIC SHEATH
              <div className="h-px w-3 bg-white/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BladeArchive({ onOpenCheckout }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBlade = KATANAS[activeIndex];

  return (
    <section
      id="blade-archive"
      className="relative overflow-x-clip bg-black px-6 pt-8 pb-16 md:px-10 md:pt-12 md:pb-20 lg:px-16"
    >
      <AmbientField className="opacity-60" />
      <div
        style={{
          backgroundImage: `radial-gradient(circle at 42% 30%, rgba(${activeBlade.accent}, 0.12), transparent 30%)`,
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12 flex flex-col gap-3"
        >
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            PRODUCT CATALOG
          </span>
          <RevealText
            text="CHOOSE YOUR BLADE"
            className="font-display text-3xl uppercase tracking-[0.05em] text-white sm:text-5xl md:text-6xl md:tracking-[0.1em]"
            delayOffset={0.1}
          />
          <p className="max-w-2xl text-xs md:text-sm leading-relaxed text-white/58">
            Click through our active neon series. Inspect engineering statistics and request builds directly from the terminal.
          </p>
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid gap-6 lg:gap-8 xl:grid-cols-[minmax(0,1.35fr)_22rem] xl:items-start">
          
          {/* Active Blade Card Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlade.id}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
                
                {/* Visual / Image column */}
                <div
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${activeBlade.accent}, 0.22), transparent 45%)`,
                  }}
                  className="relative h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-full min-h-[20rem] lg:min-h-[38rem] overflow-hidden p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_25%,rgba(0,0,0,0.5)_100%)]" />
                  
                  <motion.div
                    animate={{ opacity: [0.12, 0.24, 0.12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${activeBlade.accent}, 0.22), transparent 30%)`,
                    }}
                    className="absolute inset-0 blur-3xl pointer-events-none"
                  />
                  
                  {/* Subtle reflection shine */}
                  <motion.div
                    initial={{ x: '-150%' }}
                    animate={{ x: '150%' }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-md"
                  />

                  <KatanaImage
                    src={asset(activeBlade.src)}
                    alt={activeBlade.name}
                    priority
                    accent={activeBlade.accent}
                    className="relative z-10 h-full max-h-[260px] xs:max-h-[320px] md:max-h-[420px] w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] mix-blend-screen select-none pointer-events-none"
                  />

                  <div
                    style={{
                      borderColor: `rgba(${activeBlade.accent}, 0.45)`,
                      color: `rgb(${activeBlade.accent})`,
                    }}
                    className="absolute left-4 top-4 rounded border bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                  >
                    VARIANT / {activeBlade.id}
                  </div>
                </div>

                {/* Specs and Details column */}
                <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span
                        style={{ color: `rgb(${activeBlade.accent})` }}
                        className="font-mono text-[9px] uppercase tracking-[0.2em]"
                      >
                        {activeBlade.series}
                      </span>
                      <span className="font-mono text-[10px] text-white/50">{activeBlade.price}</span>
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-wider text-white md:text-3xl">
                      {activeBlade.name}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed text-white/60 italic">{activeBlade.lore}</p>
                  </motion.div>

                  {/* Specifications details list */}
                  <motion.div
                    key={`${activeBlade.id}-meta`}
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
                    }}
                    className="grid gap-3 text-xs text-white/50 grid-cols-2 border-t border-white/10 pt-4"
                  >
                    {[
                      { label: 'Core Material', value: activeBlade.specs.coreMaterial },
                      { label: 'Edge Finish', value: activeBlade.specs.edgeType },
                      { label: 'Neuro-Grip', value: activeBlade.specs.handleMaterial },
                      { label: 'Power Source', value: activeBlade.specs.powerSource },
                      { label: 'Blade Length', value: activeBlade.specs.bladeLength },
                      { label: 'Fictional Status', value: 'IN VAULT' },
                    ].map((spec) => (
                      <motion.div
                        key={spec.label}
                        variants={{
                          hidden: { opacity: 0, y: 6 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
                        }}
                        className="flex flex-col gap-0.5"
                      >
                        <span style={{ color: `rgb(${activeBlade.accent})` }} className="font-mono text-[8px] uppercase tracking-[0.1em]">{spec.label}</span>
                        <span className="font-mono text-[10px] text-white/80 truncate block">{spec.value}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Buy Button */}
                  <div className="flex flex-col gap-2 mt-2">
                    <MagneticButton
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        onOpenCheckout(activeBlade.id);
                      }}
                      style={{
                        borderColor: `rgba(${activeBlade.accent}, 0.3)`,
                        backgroundColor: `rgba(${activeBlade.accent}, 0.9)`,
                      }}
                      className="inline-flex items-center justify-center gap-2 border px-5 py-3 md:py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-[0.16em] text-white hover:text-black transition-all duration-300 hover:bg-white hover:border-white min-h-[44px]"
                    >
                      Reserve Concept Blade
                    </MagneticButton>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick selectors list */}
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 w-full shrink-0">
            {KATANAS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  whileHover={!isActive ? { y: -2, backgroundColor: 'rgba(255,255,255,0.02)', borderColor: `rgba(${item.accent}, 0.2)` } : {}}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setActiveIndex(index);
                  }}
                  className={`group relative overflow-hidden rounded-xl border border-white/5 bg-black/40 text-left transition-all duration-300 ${
                    isActive ? 'bg-white/[0.04]' : ''
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `rgba(${item.accent}, 0.4)`,
                          boxShadow: `0 0 15px rgba(${item.accent}, 0.1)`,
                        }
                      : undefined
                  }
                >
                  <div
                    style={{ backgroundColor: `rgba(${item.accent}, ${isActive ? 0.8 : 0.4})` }}
                    className="absolute inset-y-0 left-0 w-px"
                  />
                  <div className="grid grid-cols-[3.6rem_minmax(0,1fr)] items-center gap-3.5 p-2.5">
                    <div
                      style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(${item.accent}, 0.15), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.3))`,
                      }}
                      className="relative h-12 w-14 overflow-hidden rounded"
                    >
                      <KatanaImage
                        src={asset(item.src)}
                        alt={`${item.id} preview`}
                        accent={item.accent}
                        className="h-full w-full object-cover mix-blend-screen"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          style={{ color: `rgb(${item.accent})` }}
                          className="font-mono text-[8px] uppercase tracking-wider"
                        >
                          {item.id}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">
                          {isActive ? 'ACTIVE' : 'STANDBY'}
                        </span>
                      </div>
                      <span className="font-display text-sm uppercase tracking-wide text-white truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </motion.button>
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
    <section id="build-file" className="relative bg-black px-6 py-12 md:px-10 md:py-16 lg:px-16">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%)]" />
      <AmbientField className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            DESIGN & DEVELOPMENT
          </span>
          <RevealText
            text="HOW WE BUILT IT"
            className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]"
            delayOffset={0.1}
          />
          <p className="max-w-2xl text-base leading-8 text-white/55">
            A breakdown of the design decisions, motion principles, and product storytelling that power this experience.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildNotes.map((card, index) => (
            <TiltCard key={card.id}>
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.4)', backgroundColor: 'rgba(15,15,15,0.9)', boxShadow: '0 8px 32px -12px rgba(220,38,38,0.2)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative overflow-hidden h-full rounded-[1.5rem] border border-white/10 bg-black/55 p-6 transition-colors"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-red-500 via-white/80 to-transparent"
                />
                <div className="mb-5 flex flex-col gap-3">
                  <div className="flex items-end justify-between gap-3">
                    <span className="font-display text-5xl text-white/14">{card.id}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-500 md:tracking-[0.22em]">
                      NOTE
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/64">{card.body}</p>
              </motion.article>
            </TiltCard>
          ))}
        </div>

        {/* Archive stats row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
          }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] sm:grid-cols-4"
        >
          {[
            { label: 'COLORS AVAILABLE', value: '07', sub: 'in stock' },
            { label: 'ANIMATIONS', value: '12', sub: 'scroll effects' },
            { label: 'SOUNDS', value: '04', sub: 'sound effects' },
            { label: 'STATUS', value: 'ONLINE', sub: 'ready to buy' },
          ].map((item) => (
            <motion.div 
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="flex flex-col gap-2 bg-black/60 px-5 py-5"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-red-500">{item.label}</span>
              <span className="font-display text-3xl text-white">{item.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">{item.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechSpecsSection() {
  return (
    <section id="tech-specs" className="relative bg-black px-6 py-12 md:px-10 md:py-20 lg:px-16 border-t border-white/5">
      <AmbientField className="opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center flex flex-col gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-500">ENGINEERING STATS</span>
          <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wider text-white">THE TECHNOLOGY GRID</h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-white/50 leading-relaxed mt-1">
            Every blade is assembled with high-durability composites designed to withstand orbital combat and atmospheric entry heat.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-white/10 rounded-2xl p-5 bg-[#050505]/40 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Cpu size={16} />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-white">Neural Interfaces</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Connects directly to the user's motor cortex. Syncs swing speed and predicts deflection angles with less than 2ms latency.
            </p>
          </div>
          
          <div className="border border-white/10 rounded-2xl p-5 bg-[#050505]/40 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Layers size={16} />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-white">Mono-Carbon Edge</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              A single-atom molecular edge stabilized by constant ion flow. Able to cleave armor plates with zero blade friction.
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl p-5 bg-[#050505]/40 flex flex-col gap-3 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Activity size={16} />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-white">Ion Core Reactor</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              A closed-loop self-charging battery cell that harnesses kinetic swings to replenish the plasma charge dynamically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqData = [
    {
      q: 'Are these cybernetic katanas real physical weapons?',
      a: 'No, these katanas are fictional, artistic concepts designed for science fiction media, game engines, and collectors. They do not emit real plasma and cannot be used as weapons.',
    },
    {
      q: 'What powers the plasma glowing edge?',
      a: 'In-lore, they are driven by miniaturized quantum heart cores and obsidian ion reactors. For the physical collector display, they use high-density LED arrays powered by standard USB-C rechargeable cells.',
    },
    {
      q: 'Do they come with a display mount or sheath?',
      a: 'Yes, each concept package includes a heavy-duty magnetic mag-lock sheath, an acrylic or steel display stand, a serial-numbered authentication microchip, and a safety calibration harness.',
    },
    {
      q: 'Can I order a custom customized hilt wrap?',
      a: 'Currently, we offer the 7 distinct series models shown in the catalog. Custom wrap textures or custom laser-etched neural hilts can be requested in our private Discord channel.',
    },
  ];

  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    audio.playBeep();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="relative bg-black px-6 py-12 md:px-10 md:py-20 lg:px-16 border-t border-white/5">
      <AmbientField className="opacity-20" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-10 text-center flex flex-col gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-500">SUPPORT / FAQS</span>
          <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wider text-white">FREQUENTLY ASKED</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border border-white/10 rounded-xl bg-[#050505]/60 overflow-hidden transition-all hover:border-white/20">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left font-mono text-xs md:text-sm uppercase text-white/90 tracking-wide select-none"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-red-500" /> : <ChevronDown size={16} className="text-white/40" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 md:px-5 md:pb-5 text-xs md:text-sm leading-relaxed text-white/50 border-t border-white/5 pt-3 bg-black/40">
                        {item.a}
                      </div>
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

function FinalCTA({ onOpenCheckout }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowPulse = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.2]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  const imageYVal = isMobile ? 0 : imageY;
  const glowPulseVal = isMobile ? 0.8 : glowPulse;
  const scaleImageVal = isMobile ? 1.0 : scaleImage;

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 md:px-10 md:py-24 lg:px-16 min-h-[60vh]"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ scale: glowPulseVal }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12),transparent_60%)]"
        />
        <motion.div style={{ y: imageYVal, scale: scaleImageVal }} className="absolute inset-0 opacity-40">
          <motion.div
            animate={isMobile ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <KatanaImage
              src={asset('katanas/final-silhouette.webp')}
              alt="X-01 final silhouette"
              priority
              accent="220,38,38"
              className="h-full w-full object-cover object-center mix-blend-screen"
            />
          </motion.div>
          {/* Heavy vignette to push focus to center text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.95)_75%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
        <AmbientField className="opacity-40" />
      </div>

      {/* Centered Foreground Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center w-full">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0 }}
          className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 md:text-[10px]"
        >
          CONCLUSION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[1.1] tracking-[0.05em] text-white"
        >
          CREATE<br />MEMORABLE<br />EXPERIENCES.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-xs md:text-sm leading-relaxed text-white/50 px-4"
        >
          Cyber Katana is an artistic weapon reservation concept built to demonstrate premium interactive design and custom animation models.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-none px-6 sm:px-0"
        >
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); onOpenCheckout('X-09'); }}
            className="group relative overflow-hidden border border-red-500/50 bg-red-600/10 px-8 py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] w-full sm:w-auto flex justify-center items-center min-h-[44px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-3">
              Reserve Blade <ArrowRight size={12} />
            </span>
          </MagneticButton>
          
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); window.location.href = 'mailto:info@cyberkatana.concept'; }}
            className="group relative border border-white/10 bg-white/[0.02] px-8 py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] w-full sm:w-auto flex justify-center items-center min-h-[44px]"
          >
            Contact Us
          </MagneticButton>
          
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); scrollToId('blade-archive'); }}
            className="group relative border border-white/10 bg-white/[0.02] px-8 py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] w-full sm:w-auto flex justify-center items-center min-h-[44px]"
          >
            View Catalog
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-black/95 px-6 py-10 md:px-10 lg:px-16 text-center text-white/30 font-mono text-[9px] md:text-[10px] uppercase tracking-widest relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-display font-bold text-sm tracking-widest">CYBER KATANA</span>
          <span className="text-white/20">|</span>
          <span>NEON WEAPONRY DIVISION</span>
        </div>
        <div className="flex gap-4">
          <a href="#blade-archive" className="hover:text-white transition-colors">Catalog</a>
          <span>•</span>
          <a href="#build-file" className="hover:text-white transition-colors">Engineering</a>
          <span>•</span>
          <a href="#faq-section" className="hover:text-white transition-colors">Support</a>
        </div>
        <div>
          © {new Date().getFullYear()} CYBER KATANA. ALL RIGHTS RESERVED.
        </div>
      </div>
      <div className="max-w-xl mx-auto mt-6 text-[8px] text-white/20 border-t border-white/5 pt-4 text-center lowercase leading-relaxed">
        disclaimer: cyber katana is a fictional product project created solely for showcase purposes. no functional weaponry is sold, manufactured, or delivered.
      </div>
    </footer>
  );
}

const ArchiveSections = memo(function ArchiveSections({ onOpenCheckout }) {
  return (
    <>
      <LoreScene />
      <BladeArchive
        onOpenCheckout={onOpenCheckout}
      />
      <BuildFile />
      <TechSpecsSection />
      <FAQSection />
      <FinalCTA
        onOpenCheckout={onOpenCheckout}
      />
      <FooterSection />
    </>
  );
});

export default ArchiveSections;
