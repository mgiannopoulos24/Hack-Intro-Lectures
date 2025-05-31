// It was too much effort. Not planning to delete it even though I will not use it. :(
import { useEffect, useRef } from 'react';

// Define a prop for the image source
interface MatrixEffectProps {
  overlayImage: string; // Add a prop for the image source
}

const MatrixEffect: React.FC<MatrixEffectProps> = ({ overlayImage }) => {
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
    let drops: number[];

    const resizeCanvas = () => {
      const oldColumns = drops ? drops.length : 0;
      const oldDrops = drops ? [...drops] : [];

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Increase font sizes here
      const fontSize = window.innerWidth < 768 ? 16 : 24; // e.g., from 10:16 to 16:24
      const columns = canvas.width / fontSize;
      const newColumns = Math.floor(columns);

      // Preserve existing drops or initialize new ones
      drops = Array(newColumns).fill(1);

      // Copy over existing drop positions
      for (let i = 0; i < Math.min(oldColumns, newColumns); i++) {
        drops[i] = oldDrops[i];
      }

      // For any new columns (if screen got wider), randomize their starting positions
      for (let i = oldColumns; i < newColumns; i++) {
        drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
      }
    };

    const throttleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', throttleResize);
    resizeCanvas();

    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}.';
    const charsArray: string[] = characters.split('');

    const draw = () => {
      if (!context || !drops) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Ensure currentFontSize matches the one in resizeCanvas
      const currentFontSize = window.innerWidth < 768 ? 16 : 24; // e.g., from 10:16 to 16:24

      if (++frameCounter < frameRate) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      frameCounter = 0;

      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = `${currentFontSize}px monospace`; // Font size is applied here

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        context.fillText(text, i * currentFontSize, drops[i] * currentFontSize);

        if (drops[i] * currentFontSize > canvas.height && Math.random() > 0.975) {
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
    <>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -2, // Ensure canvas is behind the image
        }}
      />
      <img
        src={overlayImage} // Use the prop for the image source
        alt="Overlay"
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'contain', // Ensures the image covers the screen
          opacity: 0.2,
          zIndex: -1, // Image is on top of canvas, but behind other content
        }}
      />
      <div className="sr-only">
        You have to let it all go, Neo, fear, doubt, and disbelief. Free your mind.
      </div>
    </>
  );
};

export default MatrixEffect;
