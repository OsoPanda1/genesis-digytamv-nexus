import React, { useEffect, useRef } from "react";

interface TAMVTrixEffectProps {
  baseColor?: string;
  minFontSize?: number;
  maxFontSize?: number;
  speed?: number;
  density?: number;
  className?: string;
  words?: string[];
}

type Column = {
  y: number;
  depth: number;
  fontScale: number;
  drift: number;
  wordIndex: number;
  charIndex: number;
};

const DEFAULT_WORDS = ["TAMV", "ONLINE", "TAMVONLINE", "GENESIS", "DIGYTAMV"];

const TAMVTrixEffect: React.FC<TAMVTrixEffectProps> = ({
  baseColor = "#3bf5ff",
  minFontSize = 10,
  maxFontSize = 38,
  speed = 0.9,
  density = 0.94,
  className = "",
  words = DEFAULT_WORDS,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let columns: Column[] = [];
    let columnWidth = 0;
    let baseFontSize = 18;

    const lettersPool = "TAMVONLINE".split(""); // núcleo semántico del efecto

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // el ancho base de columna se deriva de una fuente estándar
      baseFontSize = (minFontSize + maxFontSize) / 2;
      columnWidth = baseFontSize * 0.8;
      const columnCount = Math.floor(canvas.width / columnWidth);

      columns = Array.from({ length: columnCount }).map((_, i): Column => {
        const depth = Math.random(); // 0 = frente, 1 = fondo
        const fontScale = 0.6 + Math.random() * 0.9; // rango de escala
        const drift = (Math.random() - 0.5) * 0.8; // deriva lateral

        return {
          y: Math.floor(Math.random() * canvas.height),
          depth,
          fontScale,
          drift,
          wordIndex: Math.floor(Math.random() * words.length),
          charIndex: Math.floor(Math.random() * lettersPool.length),
        };
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const bgFade = "rgba(1, 4, 16, 0.09)";

    const animate = () => {
      const { width, height } = canvas;

      // fondo semitransparente para estela suave, no mancha plana
      ctx.fillStyle = bgFade;
      ctx.fillRect(0, 0, width, height);

      columns.forEach((col, i) => {
        if (Math.random() > density && col.y <= 0) {
          // columna “descansa”
          return;
        }

        // profundidad → escala de fuente + opacidad + velocidad
        const depth = col.depth;
        const fontSize =
          minFontSize + (maxFontSize - minFontSize) * col.fontScale * (0.5 + 0.5 * (1 - depth));
        const velocity = speed * (0.4 + 0.8 * (1 - depth)); // más profundo = más lento
        const xCenter = i * columnWidth + columnWidth / 2 + col.drift * 18 * (1 - depth);

        // elegir siguiente carácter basado en TAMVONLINE / word actual
        const word = words[col.wordIndex] || "TAMVONLINE";
        const letter =
          depth > 0.35
            ? lettersPool[Math.floor(Math.random() * lettersPool.length)]
            : word[col.charIndex % word.length];

        // gradiente vertical con brillo en la cabeza y estela
        const yPos = col.y;
        const gradient = ctx.createLinearGradient(
          xCenter,
          yPos - fontSize * 5,
          xCenter,
          yPos + fontSize
        );

        const headColor = baseColor;
        const tailColor = `rgba(0, 180, 255, ${0.1 + 0.3 * (1 - depth)})`;
        const haloColor = `rgba(59, 245, 255, ${0.5 + 0.3 * (1 - depth)})`;

        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.35, tailColor);
        gradient.addColorStop(0.85, haloColor);
        gradient.addColorStop(1, headColor);

        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace`;
        ctx.textAlign = "center";

        // efecto de desenfoque simulado vía sombra suave
        ctx.shadowColor = `rgba(59, 245, 255, ${0.3 + 0.4 * (1 - depth)})`;
        ctx.shadowBlur = 6 + 14 * (1 - depth);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillText(letter, xCenter, yPos);

        // limpiar shadow para no contaminar otros renders
        ctx.shadowBlur = 0;

        // actualizar posición de la columna
        col.y += velocity * fontSize;

        // cuando sale de pantalla, reset pero cambia profundidad / escala
        if (col.y > height + fontSize * 2) {
          col.y = -fontSize * (2 + Math.random() * 6);
          col.depth = Math.random();
          col.fontScale = 0.6 + Math.random() * 0.9;
          col.drift = (Math.random() - 0.5) * 0.9;
          col.wordIndex = Math.floor(Math.random() * words.length);
          col.charIndex = Math.floor(Math.random() * lettersPool.length);
        } else {
          // avanzar en el “algoritmo” de letras
          if (Math.random() < 0.45) {
            col.charIndex = (col.charIndex + 1) % word.length;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseColor, minFontSize, maxFontSize, speed, density, words]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default TAMVTrixEffect;
