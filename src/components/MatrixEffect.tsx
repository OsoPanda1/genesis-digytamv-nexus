
import React, { useEffect, useRef } from 'react';

interface MatrixEffectProps {
  color?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
  text?: string[];
  className?: string;
}

const MatrixEffect: React.FC<MatrixEffectProps> = ({
  color = "#0ff8",
  fontSize = 14,
  speed = 50,
  density = 0.95,
  text = ["TAMV", "ONLINE", "GÉNESIS", "DIGYTAMV"],
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let columns: number[] = [];
    let textIndices: number[] = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Calculate columns based on font size
      const columnCount = Math.floor(canvas.width / fontSize);
      columns = Array(columnCount).fill(0);
      textIndices = Array(columnCount).fill(0).map(() => Math.floor(Math.random() * text.length));
    };

    // Initial setup and resize listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix text strings setup
    const createRandomChar = () => {
      const idx = Math.floor(Math.random() * text.length);
      return text[idx][Math.floor(Math.random() * text[idx].length)];
    };

    // Matrix animation
    const animate = () => {
      // Semi-transparent black background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      // Render each column
      columns.forEach((y, i) => {
        if (y === 0 && Math.random() > density) {
          columns[i] = 1;
          textIndices[i] = Math.floor(Math.random() * text.length);
        }
        
        if (y > 0) {
          const currentText = text[textIndices[i]];
          const charIndex = (y - 1) % currentText.length;
          const char = currentText[charIndex];
          const x = i * fontSize + fontSize / 2;
          
          // Gradient effect - brighter at the top
          const gradient = ctx.createLinearGradient(x, y * fontSize, x, (y-5) * fontSize);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, "rgba(0, 150, 220, 0.2)");
          ctx.fillStyle = gradient;
          
          ctx.fillText(char, x, y * fontSize);
          
          // Move down or reset
          if (y * fontSize > canvas.height && Math.random() > 0.99) {
            columns[i] = 0;
          } else {
            columns[i]++;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, fontSize, speed, density, text]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default MatrixEffect;
