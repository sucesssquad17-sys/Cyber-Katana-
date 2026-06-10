import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

export default function KatanaCanvas({ scrollYProgress }) {
  const canvasRef = useRef(null);
  const glowCanvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async'; // Prevents main thread blocking during massive image decodes
      if (i < 10) {
        img.fetchPriority = 'high'; // Prioritize the first frames for instant visual feedback
      } else {
        img.fetchPriority = 'low'; // Load the rest lazily
      }
      img.src = `/frames/frame_${i.toString().padStart(4, '0')}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      img.onerror = () => {
        // If a frame fails, we still increment so we don't get stuck forever
        console.warn(`Frame ${i} failed to load`);
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (img, canvas, ctx, glowCanvas, glowCtx) => {
    if (!img || !canvas || !ctx || !glowCanvas || !glowCtx) return;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    // Draw base layer
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                      
    // Draw glow layer
    glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
    glowCtx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    if (!canvas || !glowCanvas) return;
    
    // Base layer without alpha for performance
    const ctx = canvas.getContext('2d', { alpha: false });
    // Glow layer needs alpha to blend properly if we were masking, but here we just use CSS mix-blend-mode
    const glowCtx = glowCanvas.getContext('2d', { alpha: false });
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Scale internal resolution to match the physical screen pixels (fixes Retina/4K blur)
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      glowCanvas.width = window.innerWidth * dpr;
      glowCanvas.height = window.innerHeight * dpr;
      
      // Force hardware-accelerated high-quality upscaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      glowCtx.imageSmoothingEnabled = true;
      glowCtx.imageSmoothingQuality = 'high';
      
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
  }, [images, scrollYProgress]);

  return (
    <div className="absolute top-0 left-0 w-screen h-[100dvh] overflow-hidden bg-black z-0 flex items-center justify-center">
      {imagesLoaded < FRAME_COUNT && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="text-red-500 font-mono mb-4 animate-pulse tracking-widest text-sm uppercase">
            Initializing blade core... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
          <div className="w-64 h-1 bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Base layer: Increased contrast and saturation to punch up the dull frames */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-10 filter contrast-125 saturate-[1.2] brightness-105" 
      />
      
      {/* Bloom layer: Blurred heavily and layered with screen to make bright pixels (red edge) glow */}
      <canvas 
        ref={glowCanvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-10 filter blur-[15px] sm:blur-[25px] opacity-70 mix-blend-screen saturate-200 pointer-events-none" 
      />
      
      {/* Subtle vignette/gradient overlay for better text contrast at edges without blocking center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-20" />
    </div>
  );
}
