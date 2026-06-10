import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useCustomScroll() {
  const rawProgress = useMotionValue(0);
  
  // Add a spring physics layer to make the custom wheel inputs feel smooth and native
  const scrollYProgress = useSpring(rawProgress, { stiffness: 150, damping: 25, restDelta: 0.001 });
  
  useEffect(() => {
    // Disable native scrolling
    document.body.style.overflow = 'hidden';
    
    let currentScroll = 0;
    
    // The cinematic portion is fixed to window.innerHeight * 4
    const getCinematicHeight = () => window.innerHeight * 4; 
    let maxScroll = getCinematicHeight();
    
    // Checkpoints in pixels
    let checkpoints = [];
    let frictionZone = 0;
    const updateCheckpoints = () => {
      frictionZone = window.innerHeight * 0.25; // Friction applies within 25vh of a checkpoint
      checkpoints = [
        window.innerHeight * 1, // 0.25 (Grip)
        window.innerHeight * 2, // 0.50 (Flash)
        window.innerHeight * 3, // 0.75 (Specs)
        window.innerHeight * 4  // 1.00 (Buy)
      ];
      maxScroll = getCinematicHeight();
    };
    
    updateCheckpoints();

    window.addEventListener('resize', () => {
      updateCheckpoints();
    });
    
    const handleScrollUpdate = () => {
      // Progress is based purely on the cinematic portion (0 to 1)
      rawProgress.set(Math.min(1, currentScroll / getCinematicHeight()));
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      
      let multiplier = 1.0;
      
      // If scrolling DOWN, check if we are near a checkpoint
      if (delta > 0 && currentScroll < getCinematicHeight()) {
        for (let i = 0; i < checkpoints.length; i++) {
          const cp = checkpoints[i];
          if (Math.abs(currentScroll - cp) < frictionZone) {
            multiplier = 0.35; // Slow down to 35% sensitivity
            break;
          }
        }
      }
      
      currentScroll += delta * multiplier;
      currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
      handleScrollUpdate();
    };

    // --- Touch Support for Mobile ---
    let lastTouchY = 0;
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = lastTouchY - touchY;
      lastTouchY = touchY;
      
      let multiplier = 1.5; // Base touch multiplier
      
      // If scrolling DOWN, check if we are near a checkpoint
      if (delta > 0 && currentScroll < getCinematicHeight()) {
        for (let i = 0; i < checkpoints.length; i++) {
          const cp = checkpoints[i];
          if (Math.abs(currentScroll - cp) < frictionZone) {
            multiplier = 0.5; // Slow down sensitivity
            break;
          }
        }
      }
      
      currentScroll += delta * multiplier;
      currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
      handleScrollUpdate();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [rawProgress]);

  return { scrollYProgress };
}
