import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { Fingerprint, ShieldCheck } from 'lucide-react';

const VARIANTS = [
  { id: 'X-01', name: 'Crimson Red', desc: 'Base Edition', color: 'text-red-500', borderActive: 'border-red-500', price: '$2,499', src: 'katanas/x01-crimson-red.webp', available: true },
  { id: 'X-02', name: 'Electric Blue', desc: 'Select Edition', color: 'text-blue-500', borderActive: 'border-blue-500', price: '$2,699', src: 'katanas/x02-electric-blue.webp', available: true },
  { id: 'X-03', name: 'Emerald Green', desc: 'Select Edition', color: 'text-emerald-500', borderActive: 'border-emerald-500', price: '$2,699', src: 'katanas/x03-emerald-green.webp', available: true },
  { id: 'X-04', name: 'Royal Purple', desc: 'Limited Edition', color: 'text-purple-500', borderActive: 'border-purple-500', price: '$3,199', src: 'katanas/x04-royal-purple.webp', available: false },
  { id: 'X-05', name: 'Ghost White', desc: 'Limited Edition', color: 'text-neutral-300', borderActive: 'border-neutral-400', price: '$2,499', src: 'katanas/x05-ghost-white.webp', available: false }
];

export default function CheckoutPanel({ isOpen, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVariant = VARIANTS[activeIndex];

  const handleClose = () => {
    audio.playBeep();
    onClose();
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(false);
      setActiveIndex(0);
    }, 500);
  };

  const playHover = () => audio.playGlassTap();

  const handleAuthorize = () => {
    if (!activeVariant.available) return;
    audio.playBeep();
    setIsProcessing(true);
    setTimeout(() => {
      audio.playImpact();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505] overflow-y-auto"
        >
          {/* Top Navbar */}
          <div className="flex justify-between items-start p-4 md:p-6 relative z-20">
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-display text-xl tracking-widest uppercase">Checkout</h2>
              <p className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase">Secure Payment</p>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/30 transition-colors bg-white/5"
            >
              <span className="text-white text-[10px] font-mono tracking-widest uppercase transition-colors">Close</span>
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-4 pb-4 lg:pb-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative z-10">
            
            {/* Left: Image */}
            <motion.div 
              key={activeVariant.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 w-full flex items-center justify-center relative min-h-[30vh] lg:min-h-[60vh]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />
              <motion.img 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={`${import.meta.env.BASE_URL}${activeVariant.src}`}
                alt={activeVariant.name} 
                className="w-full max-w-[240px] md:max-w-[320px] lg:max-w-[480px] max-h-[35vh] md:max-h-[50vh] lg:max-h-[70vh] object-contain relative z-10 mix-blend-screen opacity-90 drop-shadow-2xl" 
              />
            </motion.div>

            {/* Right: Checkout Details */}
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
              }}
              className="flex-1 w-full max-w-md flex flex-col gap-4"
            >
              {!isSuccess ? (
                <>
                  {/* Header / Price */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="flex flex-col gap-0.5 pb-3 border-b border-white/10">
                    <span className={`${activeVariant.color} font-mono text-[9px] tracking-[0.3em] uppercase`}>
                      {activeVariant.desc}
                    </span>
                    <div className="flex justify-between items-end">
                      <h1 className="text-2xl md:text-3xl font-display text-white tracking-widest uppercase">
                        {activeVariant.name}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-light text-white tracking-widest">{activeVariant.price}</span>
                      <span className="text-white/40 font-mono text-[9px] tracking-widest uppercase mt-0.5">USD</span>
                    </div>
                  </motion.div>

                  {/* Variant Selection List */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="flex flex-col gap-1.5">
                    <span className="text-white/40 font-mono text-[8px] tracking-[0.2em] uppercase mb-0.5">Select Edition</span>
                    <div className="flex flex-col gap-1">
                      {VARIANTS.map((variant, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <motion.button
                            key={variant.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              playHover();
                              setActiveIndex(index);
                            }}
                            className={`flex justify-between items-center px-3 py-1.5 border transition-all duration-300 ${
                              isActive ? `bg-white/5 ${variant.borderActive}` : 'border-white/10 hover:border-white/30 bg-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`font-mono text-[9px] tracking-widest uppercase ${isActive ? variant.color : 'text-white/40'}`}>
                                {variant.id}
                              </span>
                              <span className={`font-mono text-[10px] tracking-widest uppercase ${isActive ? 'text-white' : 'text-white/60'}`}>
                                {variant.name}
                              </span>
                            </div>
                            {!variant.available && (
                              <span className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase">Out of Stock</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Action Area */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="flex flex-col gap-2 mt-1">
                    <input 
                      type="text" 
                      placeholder="PROMO CODE"
                      className="w-full bg-white/5 border border-white/10 text-white font-mono text-[10px] px-3 py-2 outline-none focus:border-white/40 transition-colors uppercase tracking-widest placeholder-white/30"
                    />
                    <motion.button 
                      whileTap={isProcessing || !activeVariant.available ? {} : { scale: 0.98 }}
                      onClick={handleAuthorize}
                      onMouseEnter={playHover}
                      disabled={isProcessing || !activeVariant.available}
                      className={`w-full py-2.5 font-mono uppercase tracking-widest text-[10px] transition-all relative overflow-hidden group ${
                        !activeVariant.available 
                          ? 'bg-neutral-900 border border-neutral-800 text-neutral-600 cursor-not-allowed'
                          : isProcessing 
                            ? 'bg-white/10 border border-white/20 text-white/50 cursor-wait' 
                            : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-3">
                          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      ) : !activeVariant.available ? (
                        'Out of Stock'
                      ) : (
                        'Complete Purchase'
                      )}
                    </motion.button>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }} className="flex items-center gap-2 mt-1">
                    <ShieldCheck className="text-white/30" size={12} />
                    <span className="text-white/30 font-mono text-[8px] tracking-widest uppercase">Secure Transaction</span>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-12 border border-white/10 bg-white/5"
                >
                  <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/5 rounded-full animate-ping" />
                    <Fingerprint className="text-white/80" size={32} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white text-xl font-display uppercase tracking-widest">Order Confirmed</h2>
                    <p className="text-white/50 font-mono text-[10px] leading-relaxed max-w-[280px] mx-auto uppercase tracking-widest">
                      Your order for {activeVariant.name} has been successfully placed. You will receive an email confirmation shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
