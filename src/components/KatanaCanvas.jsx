import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

export default function KatanaCanvas({ scrollYProgress }) {
  const canvasRef = useRef(null);
  const glowCanvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = new Array(FRAME_COUNT).fill(null);
        
        // Priority 1: Load just the VERY FIRST frame so we can immediately show the site
        const firstImg = new Image();
        firstImg.src = `${import.meta.env.BASE_URL}frames/frame_0000.webp`;
        await new Promise((resolve) => {
          firstImg.onload = () => {
            loadedImages[0] = firstImg;
            resolve();
          };
          firstImg.onerror = resolve; // Continue even on error
        });

        // Set images and hide the loader instantly!
        setImages(loadedImages);
        setIsLoaded(true);

        // Priority 2: Background lazy-load the rest of the frames
        let currentIndex = 1;
        const loadNextBatch = async () => {
          const batchSize = 10;
          const promises = [];
          
          for (let i = 0; i < batchSize && currentIndex < FRAME_COUNT; i++, currentIndex++) {
            const index = currentIndex;
            promises.push(new Promise((resolve) => {
              const img = new Image();
              img.src = `${import.meta.env.BASE_URL}frames/frame_${index.toString().padStart(4, '0')}.webp`;
              img.onload = () => {
                loadedImages[index] = img;
                resolve();
              };
              img.onerror = resolve;
            }));
          }
          
          if (promises.length > 0) {
            await Promise.all(promises);
            setImages([...loadedImages]);
            if (currentIndex < FRAME_COUNT) {
              setTimeout(loadNextBatch, 10);
            }
          }
        };

        loadNextBatch();
      } catch (error) {
        console.error("Error loading frames:", error);
        setIsLoaded(true);
      }
    };

    loadImages();
  }, []);

  const drawImage = (img, canvas, ctx, glowCanvas, glowCtx) => {
    if (!img || !canvas || !ctx) return;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    
    const isMobileViewport = window.innerWidth < 768;
    const ratio = isMobileViewport ? Math.max(hRatio, vRatio) * 0.6 : Math.max(hRatio, vRatio);
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    // Draw base layer
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                      
    // Draw glow layer (only if not mobile)
    if (!isMobileViewport && glowCanvas && glowCtx) {
      glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
      glowCtx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    if (!canvas) return;
    
    // Base layer without alpha for performance
    const ctx = canvas.getContext('2d', { alpha: false });
    // Glow layer needs alpha to blend properly if we were masking, but here we just use CSS mix-blend-mode
    const glowCtx = glowCanvas ? glowCanvas.getContext('2d', { alpha: false }) : null;
    
    const resizeCanvas = () => {
      const isMobileViewport = window.innerWidth < 768;
      // Cap DPR to 1 on mobile to save massive amounts of GPU rendering
      const dpr = isMobileViewport ? 1 : (window.devicePixelRatio || 1);
      
      // Scale internal resolution to match the physical screen pixels (fixes Retina/4K blur)
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (glowCanvas) {
        glowCanvas.width = window.innerWidth * dpr;
        glowCanvas.height = window.innerHeight * dpr;
      }
      
      // Force hardware-accelerated high-quality upscaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      if (glowCtx) {
        glowCtx.imageSmoothingEnabled = true;
        glowCtx.imageSmoothingQuality = 'high';
      }
      
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
      if (images[frameIndex] && images[frameIndex].complete) {
        drawImage(images[frameIndex], canvas, ctx, glowCanvas, glowCtx);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
      if (images[frameIndex] && images[frameIndex].complete) {
        requestAnimationFrame(() => drawImage(images[frameIndex], canvas, ctx, glowCanvas, glowCtx));
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [images, scrollYProgress, isMobile]);

  return (
    <div className="absolute top-0 left-0 w-screen h-[100dvh] overflow-hidden bg-black z-0 flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="w-12 h-12 border-4 border-red-900 border-t-red-500 rounded-full animate-spin"></div>
          <div className="text-red-500 font-mono text-sm tracking-widest animate-pulse mt-4">INITIALIZING SYSTEM</div>
        </div>
      )}
      
      {/* Base layer: Increased contrast and saturation to punch up the dull frames (disabled on mobile to save GPU) */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full object-cover z-10 ${!isMobile ? 'filter contrast-125 saturate-[1.2] brightness-105' : ''}`} 
      />
      
      {/* Bloom layer: Blurred heavily and layered with screen to make bright pixels (red edge) glow. Removed on mobile for performance. */}
      {!isMobile && (
        <canvas 
          ref={glowCanvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-10 filter blur-[15px] sm:blur-[25px] opacity-70 mix-blend-screen saturate-200 pointer-events-none" 
        />
      )}
      
      {/* Subtle vignette/gradient overlay for better text contrast at edges without blocking center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-20" />
    </div>
  );
}
