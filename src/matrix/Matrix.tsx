// It was too much effort. Not planning to delete it even though I will not use it. :(
import { useEffect, useRef } from 'react';

const MatrixEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!context) {
      console.error('Could not get 2D context from canvas');
      return;
    }

    let animationFrameId: number;
    const frameRate = 3;
    let frameCounter = 0;
    let resizeTimeoutId: number | undefined;
    let drops: number[]; // Declare drops here

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fontSize = window.innerWidth < 768 ? 10 : 16;
      const columns = canvas.width / fontSize;
      // Initialize or re-initialize drops here
      drops = Array(Math.floor(columns)).fill(1);
    };

    const throttleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(resizeCanvas, 50);
    };

    window.addEventListener('resize', throttleResize);
    resizeCanvas(); // Initial size calculation and drops initialization

    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}.';
    const charsArray: string[] = characters.split('');
    // Note: fontSize is now primarily determined within resizeCanvas
    // We still need an initial value for the first draw call before resize might happen
    const initialFontSize = window.innerWidth < 768 ? 10 : 16;

    const draw = () => {
      if (!context) return;

      // Use the font size determined by the last resize
      const currentFontSize = window.innerWidth < 768 ? 10 : 16;

      if (++frameCounter < frameRate) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      frameCounter = 0;

      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = `${currentFontSize}px monospace`; // Use current font size

      // Ensure drops is initialized before trying to access its length
      if (!drops) return;

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        context.fillText(text, i * currentFontSize, drops[i] * currentFontSize); // Use current font size

        if (drops[i] * currentFontSize > canvas.height && Math.random() > 0.975) {
          // Use current font size
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', throttleResize);
      clearTimeout(resizeTimeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  ); // Added basic styling
};

export default MatrixEffect;
