import { useRef, useState, memo } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
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
    specs: { material: 'Plasma Alloy', edge: 'Redline Conduit', grip: 'Silent Neuro-Wrap', sheath: 'Mag-Lock Zero Draw', length: '73cm' }
  },
  {
    id: 'X-02',
    name: 'Azure Wraith',
    series: 'Signal Series',
    note: 'Electric blue edge / cold mist chamber',
    src: asset('katanas/x02-electric-blue.webp'),
    accent: '59,130,246',
    specs: { material: 'Titanium-Cobalt', edge: 'Ionized Core', grip: 'Cryo-Cooling Wrap', sheath: 'Quick-Release Mag', length: '71cm' }
  },
  {
    id: 'X-03',
    name: 'Viper Coil',
    series: 'Venom Series',
    note: 'Emerald core / toxic glow lattice',
    src: asset('katanas/x03-emerald-green.webp'),
    accent: '34,197,94',
    specs: { material: 'Carbon Fiber Weave', edge: 'Acidic Glow Lattice', grip: 'Bio-Synthetic Leather', sheath: 'Sealed Containment', length: '75cm' }
  },
  {
    id: 'X-04',
    name: 'Neon Shogun',
    series: 'Ceremony Series',
    note: 'Violet plasma line / ritual-grade finish',
    src: asset('katanas/x04-royal-purple.webp'),
    accent: '168,85,247',
    specs: { material: 'Damascus Steel Fold', edge: 'Ultraviolet Plasma', grip: 'Silk-Woven Neuro-Cord', sheath: 'Ceremonial Mag-Lock', length: '78cm' }
  },
  {
    id: 'X-05',
    name: 'Ghost Alloy',
    series: 'Null Series',
    note: 'White alloy edge / frost-signal silence',
    src: asset('katanas/x05-ghost-white.webp'),
    accent: '226,232,240',
    specs: { material: 'Ghost Alloy', edge: 'Absolute Zero Line', grip: 'Aero-Gel Padding', sheath: 'Stealth Suppressor', length: '70cm' }
  },
  {
    id: 'X-06',
    name: 'Solar Circuit',
    series: 'Crown Series',
    note: 'Amber charge line / royal heat bloom',
    src: asset('katanas/x06-molten-gold.webp'),
    accent: '245,158,11',
    specs: { material: 'Tungsten Core', edge: 'Thermal Bloom Line', grip: 'Heat-Resistant Polymer', sheath: 'Thermal Diffuser', length: '74cm' }
  },
  {
    id: 'X-07',
    name: 'Cyan Rift',
    series: 'Rift Series',
    note: 'Cyan-teal current / deep signal split',
    src: asset('katanas/x07-neon-cyan.webp'),
    accent: '20,184,166',
    specs: { material: 'Quantum Glass', edge: 'Tachyon Current', grip: 'Phase-Shifting Wrap', sheath: 'Dimensional Lock', length: '72cm' }
  },
];

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
    smoke: 'LOADING BACKGROUND',
    scan: 'SCANNING PRODUCTS',
    blackout: 'TRANSITIONING',
    bloom: 'REACHING THE END',
  };

  return (
    <section
      ref={ref}
      className="relative h-[10vh] min-h-16 overflow-hidden bg-black md:h-[14vh] md:min-h-24"
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
      className="relative overflow-hidden bg-black px-6 pt-12 pb-8 md:px-10 md:pt-16 md:pb-12 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(255,255,255,0.03),transparent_16%),radial-gradient(circle_at_76%_58%,rgba(220,38,38,0.06),transparent_24%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-500">
              BACKGROUND STORY
            </span>
            <div className="space-y-0.5">
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
            className="max-w-sm text-sm leading-snug text-white/60"
          >
            This is a fictional 3D katana concept created to showcase modern web design and animation techniques.
          </motion.p>

          {/* Quote block */}
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="my-1 border-l-2 border-red-500/40 py-1 pl-3"
          >
            <p className="font-mono text-xs italic leading-snug text-white/40">
              &ldquo;A perfect blend of traditional design and modern technology.&rdquo;
            </p>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-red-500/70">
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
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } }
            }}
            className="mt-1 grid grid-cols-2 gap-1.5 sm:grid-cols-3"
          >
            {[
              { label: 'LENGTH', value: '73cm' },
              { label: 'MATERIAL', value: 'PLASMA ALLOY' },
              { label: 'WEIGHT', value: 'ULTRA-LIGHT' },
              { label: 'CATEGORY', value: 'CRIMSON' },
              { label: 'AVAILABILITY', value: 'LIMITED' },
              { label: 'GLOW COLOR', value: 'REDLINE' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="flex flex-col border-l-2 border-white/10 bg-white/[0.02] px-2 py-1.5"
              >
                <span className="font-mono text-[8px] uppercase tracking-widest text-red-500/80">{stat.label}</span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-white/90">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 0 30px rgba(220,38,38,0.15)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-crosshair"
        >
          <motion.div
            style={{ scale: glowScale }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(220,38,38,0.12),transparent_40%)]"
          />

          <div className="relative min-h-[16rem] p-4 md:min-h-[22rem] lg:min-h-[26rem]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="h-full w-full"
            >
              <KatanaImage
                src={asset('katanas/blueprint-x01.webp')}
                alt="X-01 blueprint"
                priority
                accent="220,38,38"
                className="h-full w-full object-cover object-center opacity-90 mix-blend-screen"
              />
            </motion.div>

            <motion.div
              style={{ y: scanY }}
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
            >
              <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </motion.div>

            <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400/80 md:left-6 md:top-6">
              <div className="h-px w-4 bg-red-500/50" />
              GLOWING BLADE
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:bottom-6 md:right-6">
              MAGNETIC SHEATH
              <div className="h-px w-4 bg-white/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BladeArchive({ onOpenCheckout }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBlade = archiveItems[activeIndex];

  return (
    <section
      id="blade-archive"
      className="relative overflow-x-clip bg-black px-6 pt-8 pb-12 md:px-10 md:pt-12 md:pb-16 lg:px-16"
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
          transition={{ duration: 1.0 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-500 md:tracking-[0.28em]">
            PRODUCT CATALOG
          </span>
          <RevealText
            text="CHOOSE YOUR BLADE"
            className="font-display text-4xl uppercase tracking-[0.05em] text-white md:text-6xl md:tracking-[0.1em]"
            delayOffset={0.1}
          />
          <p className="max-w-2xl text-base leading-8 text-white/58 md:text-lg">
            Multiple color variants available. Choose the one that fits your style.
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
                    VIEWING / {activeBlade.id}
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
                      SELECTED / {activeBlade.id}
                    </span>
                    <h3 className="font-display text-3xl uppercase tracking-[0.05em] text-white md:text-5xl md:tracking-[0.1em]">
                      {activeBlade.name}
                    </h3>
                    <p className="text-base leading-8 text-white/66">{activeBlade.note}</p>
                  </motion.div>

                  <motion.div
                    key={`${activeBlade.id}-meta`}
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                    }}
                    className="grid gap-3 text-sm text-white/48 sm:grid-cols-2 lg:grid-cols-2"
                  >
                    {[
                      { label: 'Blade Material', value: activeBlade.specs.material },
                      { label: 'Plasma Edge', value: activeBlade.specs.edge },
                      { label: 'Grip System', value: activeBlade.specs.grip },
                      { label: 'Sheath Tech', value: activeBlade.specs.sheath },
                      { label: 'Dimensions', value: activeBlade.specs.length },
                      { label: 'Status', value: 'Available' },
                    ].map((spec) => (
                      <motion.div
                        key={spec.label}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                        }}
                        className="border-t border-white/10 pt-3"
                      >
                        <div style={{ color: `rgb(${activeBlade.accent})` }} className="font-mono text-[9px] uppercase tracking-[0.16em]">{spec.label}</div>
                        <div className="mt-1 font-mono text-xs text-white/80">{spec.value}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex flex-col gap-4 mt-2">
                    <MagneticButton
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
                      Buy Now
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {archiveItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  whileHover={!isActive ? { y: -3, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: `rgba(${item.accent}, 0.2)` } : {}}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => {
                    playHover();
                  }}
                  onClick={() => {
                    playClick();
                    setActiveIndex(index);
                  }}
                  className={`group relative overflow-hidden rounded-[1rem] border border-white/10 bg-black/52 text-left transition-all duration-300 ${
                    isActive ? 'bg-white/[0.04]' : ''
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
                          {isActive ? 'SELECTED' : 'UNAVAILABLE'}
                        </span>
                      </div>
                      <span className="font-display text-lg uppercase tracking-[0.04em] text-white md:text-xl">
                        {item.name}
                      </span>
                      <span
                        style={{ color: isActive ? `rgb(${item.accent})` : undefined }}
                        className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/40 md:text-[9px] md:tracking-[0.18em]"
                      >
                        {isActive ? 'SELECTED' : 'UNSELECTED'}
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

function FinalCTA({ onOpenCheckout }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowPulse = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.2]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 md:px-10 md:py-20 lg:px-16 min-h-[60vh]"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ scale: glowPulse }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_60%)]"
        />
        <motion.div style={{ y: imageY, scale: scaleImage }} className="absolute inset-0 opacity-40">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <KatanaImage
              src={asset('katanas/final-silhouette.webp')}
              alt="X-01 final silhouette"
              priority
              accent="220,38,38"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          {/* Heavy vignette to push focus to center text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.95)_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
        <AmbientField className="opacity-40" />
      </div>

      {/* Centered Foreground Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0 }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-red-500 md:text-[11px]"
        >
          CONCLUSION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-5xl uppercase leading-[1.05] tracking-[0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          CREATE<br />MEMORABLE<br />EXPERIENCES.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/50 md:text-lg"
        >
          Cyber Katana X-01 is a fictional product experience built to showcase cinematic web design, motion language, and premium product storytelling.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); onOpenCheckout(); }}
            className="group relative overflow-hidden border border-red-500/50 bg-red-600/10 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-3">
              Buy Now <ArrowRight size={12} />
            </span>
          </MagneticButton>
          
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); window.location.href = 'mailto:your@email.com'; }}
            className="group relative border border-white/10 bg-white/[0.02] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
          >
            Contact Us
          </MagneticButton>
          
          <MagneticButton
            onMouseEnter={playHover}
            onClick={() => { playClick(); scrollToId('blade-archive'); }}
            className="group relative border border-white/10 bg-white/[0.02] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
          >
            View Catalog
          </MagneticButton>
        </motion.div>

        {/* Bottom Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-6 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30"
        >
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,1)]" />
            ONLINE
          </div>
          <span className="h-px w-8 bg-white/10" />
          <button
            onMouseEnter={playHover}
            onClick={() => { playClick(); scrollToId('build-file'); }}
            className="flex items-center gap-2 transition-colors hover:text-red-400"
          >
            Read Notes <Shield size={10} />
          </button>
        </motion.div>
      </div>
    </section>
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
      <FinalCTA
        onOpenCheckout={onOpenCheckout}
      />
    </>
  );
});

export default ArchiveSections;
