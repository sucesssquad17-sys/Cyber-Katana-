import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/AudioEngine';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const VARIANTS = [
  { id: 'X-01', name: 'Crimson Red', desc: 'Base Edition', price: '$2,499', src: 'katanas/x01-crimson-red.webp', available: true },
  { id: 'X-02', name: 'Electric Blue', desc: 'Select Edition', price: '$2,699', src: 'katanas/x02-electric-blue.webp', available: true },
  { id: 'X-03', name: 'Emerald Green', desc: 'Select Edition', price: '$2,699', src: 'katanas/x03-emerald-green.webp', available: true },
  { id: 'X-04', name: 'Royal Purple', desc: 'Limited Edition', price: '$3,199', src: 'katanas/x04-royal-purple.webp', available: false },
  { id: 'X-05', name: 'Ghost White', desc: 'Limited Edition', price: '$2,499', src: 'katanas/x05-ghost-white.webp', available: false }
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

  const handleCheckout = () => {
    if (!activeVariant.available) return;
    audio.playBeep();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-neutral-950 overflow-y-auto overflow-x-hidden font-sans"
        >
          {/* Subtle Background */}
          <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_80%)]" />

          <div className="relative z-10 w-full max-w-[1200px] mx-auto min-h-screen flex flex-col p-6 md:p-12">
            
            {/* Header */}
            <header className="flex justify-between items-center shrink-0 mb-12">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-neutral-400" size={24} />
                <h2 className="text-white font-medium text-lg tracking-wide">Secure Checkout</h2>
              </div>
              <button 
                onClick={handleClose}
                className="text-neutral-400 hover:text-white text-sm tracking-wider uppercase transition-colors"
              >
                Close
              </button>
            </header>

            {/* Content Grid */}
            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center lg:items-start pb-12 lg:pb-0">
              
              {/* Left: Product Image */}
              <div className="relative w-full flex items-center justify-center lg:justify-end">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full max-w-[500px] aspect-[4/5] relative flex items-center justify-center bg-neutral-900/50 rounded-2xl border border-white/5 overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeVariant.id}
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.4 }}
                      src={`${import.meta.env.BASE_URL}${activeVariant.src}`}
                      alt={activeVariant.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Right: Checkout Details */}
              <div className="w-full max-w-[440px] flex flex-col justify-center gap-8 mx-auto lg:mx-0">
                {!isSuccess ? (
                  <>
                    <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
                      <span className="text-neutral-400 text-xs tracking-widest uppercase">{activeVariant.desc}</span>
                      <h1 className="text-3xl font-light text-white tracking-wide">{activeVariant.name}</h1>
                      <div className="text-2xl font-medium text-white mt-2">{activeVariant.price}</div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <span className="text-neutral-400 text-xs tracking-widest uppercase">Select Edition</span>
                      <div className="grid grid-cols-1 gap-3">
                        {VARIANTS.map((variant, index) => {
                          const isActive = index === activeIndex;
                          const isOOS = !variant.available;
                          
                          return (
                            <button
                              key={variant.id}
                              onClick={() => {
                                if (!isOOS) setActiveIndex(index);
                              }}
                              className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
                                isActive 
                                  ? 'border-white bg-white/5' 
                                  : isOOS 
                                    ? 'border-white/5 opacity-40 cursor-not-allowed'
                                    : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-transparent border border-white/30'}`} />
                                <span className={`text-sm ${isActive ? 'text-white' : 'text-neutral-400'}`}>{variant.name}</span>
                              </div>
                              <span className={`text-xs ${isOOS ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                {isOOS ? 'Sold Out' : variant.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="text-neutral-400 text-xs tracking-widest uppercase">Promo Code</span>
                      <input 
                        type="text" 
                        placeholder="Enter code"
                        className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/50 outline-none transition-colors placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                      <button 
                        onClick={handleCheckout}
                        disabled={isProcessing || !activeVariant.available}
                        className={`w-full py-4 rounded-xl font-medium tracking-wide transition-all ${
                          !activeVariant.available 
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : isProcessing 
                              ? 'bg-neutral-800 text-neutral-400 cursor-wait' 
                              : 'bg-white text-black hover:bg-neutral-200 hover:scale-[0.98]'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : !activeVariant.available ? 'Out of Stock' : 'Complete Purchase'}
                      </button>

                      <div className="flex justify-center items-center gap-2 text-neutral-500 text-xs">
                        <ShieldCheck size={14} />
                        <span>Concept only. No actual payment processing.</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center gap-6 py-12 px-6 rounded-2xl border border-white/10 bg-white/5"
                  >
                    <CheckCircle2 className="text-white" size={48} />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-white text-xl font-medium tracking-wide">Order Confirmed</h2>
                      <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
                        Your order for the {activeVariant.name} has been placed successfully. A confirmation email will be sent shortly.
                      </p>
                    </div>
                    <button 
                      onClick={handleClose}
                      className="mt-4 px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Return to Store
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
