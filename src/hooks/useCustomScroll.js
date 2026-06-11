import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useCustomScroll(enabled = true) {
  const rawProgress = useMotionValue(0);
  
  // Add a spring physics layer to make the custom wheel inputs feel smooth and native
  const scrollYProgress = useSpring(rawProgress, { stiffness: 150, damping: 25, restDelta: 0.001 });
  
  useEffect(() => {
    // Disable native scrolling
    document.body.style.overflow = 'hidden';
    
    let currentScroll = 0;
    
    // The cinematic portion is fixed to window.innerHeight * 5
    const getCinematicHeight = () => window.innerHeight * 5; 
    let maxScroll = getCinematicHeight();
    
    // Checkpoints in pixels
    let checkpoints = [];
    let frictionZone = 0;
    const updateCheckpoints = () => {
      frictionZone = window.innerHeight * 0.25; // Friction applies within 25vh of a checkpoint
      checkpoints = [
        window.innerHeight * 1, // 0.20 (Grip)
        window.innerHeight * 2, // 0.40 (Flash)
        window.innerHeight * 3, // 0.60 (Lore)
        window.innerHeight * 4, // 0.80 (Specs)
        window.innerHeight * 5  // 1.00 (Buy)
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

    let autoScrollRafId = null;
    let isAutoScrolling = false;

    const stopAutoScroll = () => {
      isAutoScrolling = false;
      if (autoScrollRafId) {
        cancelAnimationFrame(autoScrollRafId);
        autoScrollRafId = null;
      }
    };

    const startAutoScroll = () => {
      if (isAutoScrolling) return;
      isAutoScrolling = true;
      let lastTime = performance.now();
      
      const loop = (time) => {
        if (!isAutoScrolling) return;
        const dt = time - lastTime;
        lastTime = time;
        
        // Auto scroll speed: ~0.60 viewport heights per second
        const scrollSpeed = window.innerHeight * 0.60; 
        currentScroll += (scrollSpeed * dt) / 1000;
        
        if (currentScroll >= maxScroll) {
          currentScroll = maxScroll;
          isAutoScrolling = false;
        }
        handleScrollUpdate();
        
        if (isAutoScrolling) {
          autoScrollRafId = requestAnimationFrame(loop);
        }
      };
      autoScrollRafId = requestAnimationFrame(loop);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (!enabled) return; // Block scrolling if not enabled
      const delta = e.deltaY;
      
      if (delta > 0) {
        startAutoScroll();
      } else {
        stopAutoScroll();
        
        // Sync currentScroll to visual progress so we don't jump when interrupting
        const visualProgress = scrollYProgress.get();
        const targetProgress = rawProgress.get();
        if (targetProgress > visualProgress + 0.01) {
          currentScroll = visualProgress * getCinematicHeight();
        }

        let multiplier = 1.0;
        
        // If scrolling within the cinematic section, check if we are near a checkpoint
        if (currentScroll < getCinematicHeight()) {
          for (let i = 0; i < checkpoints.length; i++) {
            const cp = checkpoints[i];
            if (Math.abs(currentScroll - cp) < frictionZone) {
              multiplier = 0.5; // Slow down to 50% sensitivity (sped up from 35%)
              break;
            }
          }
        }
        
        // Halve speed for the final segment (the last rotation/retreat)
        if (currentScroll > window.innerHeight * 4) {
          multiplier *= 0.5;
        }
        
        currentScroll += delta * multiplier;
        currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
        handleScrollUpdate();
      }
    };

    // --- Touch Support for Mobile ---
    let lastTouchY = 0;
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!enabled) return; // Block scrolling if not enabled
      const touchY = e.touches[0].clientY;
      const delta = lastTouchY - touchY;
      lastTouchY = touchY;
      
      if (delta > 0) {
        startAutoScroll();
      } else {
        stopAutoScroll();
        
        const visualProgress = scrollYProgress.get();
        const targetProgress = rawProgress.get();
        if (targetProgress > visualProgress + 0.01) {
          currentScroll = visualProgress * getCinematicHeight();
        }

        let multiplier = 3.5; // High base touch multiplier for effortless swiping
        
        // If scrolling within the cinematic section, check if we are near a checkpoint
        if (currentScroll < getCinematicHeight()) {
          for (let i = 0; i < checkpoints.length; i++) {
            const cp = checkpoints[i];
            if (Math.abs(currentScroll - cp) < frictionZone) {
              multiplier = 1.5; // Friction slows it down, but still faster than desktop
              break;
            }
          }
        }
        
        // Halve speed for the final segment
        if (currentScroll > window.innerHeight * 4) {
          multiplier *= 0.6;
        }
        
        currentScroll += delta * multiplier;
        currentScroll = Math.max(0, Math.min(currentScroll, maxScroll));
        handleScrollUpdate();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      stopAutoScroll();
    };
  }, [rawProgress, enabled]);

  return { scrollYProgress };
}
