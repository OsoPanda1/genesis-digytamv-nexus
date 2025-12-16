import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Matrix3DEffectProps {
  title?: string;
  subtitle?: string;
  showHero?: boolean;
}

const Matrix3DEffect: React.FC<Matrix3DEffectProps> = ({ 
  title = "TAMV ONLINE",
  subtitle = "EL METAVERSO DESTRUCTOR",
  showHero = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: number[] = [];
    
    const chars = "TAMVONLINEGENESISNEXUSISABELLA01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.ceil(canvas.width / fontSize);
      columns = Array(colCount).fill(1).map(() => Math.random() * canvas.height / fontSize);
    };

    const draw = () => {
      // Fading trail effect
      ctx.fillStyle = "rgba(10, 15, 30, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix characters
      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        // Gradient effect based on position
        const distFromCenter = Math.abs(i / columns.length - 0.5) * 2;
        const hue = 180 + distFromCenter * 40; // Cyan to teal
        const lightness = 50 + Math.random() * 20;
        
        ctx.fillStyle = `hsla(${hue}, 100%, ${lightness}%, ${0.8 + Math.random() * 0.2})`;
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillText(char, x, y);

        // Glow effect for leading characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
          ctx.shadowBlur = 15;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
        }

        // Reset column or advance
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      {/* Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      {/* 3D Depth Layers */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `rotateY(${(mousePos.x - 0.5) * 10}deg) rotateX(${(mousePos.y - 0.5) * -5}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out"
        }}
      >
        {/* Far layer - subtle grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            transform: "translateZ(-200px) scale(1.4)"
          }}
        />

        {/* Mid layer - floating particles */}
        <div 
          className="absolute inset-0"
          style={{ transform: "translateZ(-100px)" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Title Section */}
      {showHero && (
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
              style={{
                transform: `translateZ(50px) rotateY(${(mousePos.x - 0.5) * 5}deg) rotateX(${(mousePos.y - 0.5) * -2.5}deg)`,
              }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider mb-4"
                style={{
                  textShadow: `
                    0 0 10px rgba(0, 240, 255, 0.8),
                    0 0 20px rgba(0, 240, 255, 0.6),
                    0 0 40px rgba(0, 240, 255, 0.4),
                    0 0 80px rgba(0, 240, 255, 0.2)
                  `,
                  color: "transparent",
                  background: "linear-gradient(180deg, #ffffff 0%, #00f0ff 30%, #0088ff 70%, #004488 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.4)",
                    "0 0 15px rgba(0, 240, 255, 1), 0 0 30px rgba(0, 240, 255, 0.8), 0 0 60px rgba(0, 240, 255, 0.5)",
                    "0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {title}
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent blur-xl" />
                <h2 
                  className="text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.3em] text-red-400"
                  style={{
                    textShadow: "0 0 10px rgba(255, 100, 100, 0.8), 0 0 20px rgba(255, 50, 50, 0.4)"
                  }}
                >
                  {subtitle}
                </h2>
              </motion.div>

              {/* Decorative lines */}
              <motion.div
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div className="h-px w-32 bg-gradient-to-r from-transparent to-accent" />
                <div className="w-2 h-2 rotate-45 bg-accent animate-pulse" />
                <div className="h-px w-32 bg-gradient-to-l from-transparent to-accent" />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-6 text-muted-foreground text-sm md:text-base tracking-widest"
              >
                REDEFINIENDO EL FUTURO DE LAS REDES SOCIALES
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 30, 0.7) 100%)"
        }}
      />

      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)"
        }}
      />
    </div>
  );
};

export default Matrix3DEffect;
