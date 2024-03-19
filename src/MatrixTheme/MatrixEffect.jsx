import React, { useRef, useEffect } from 'react';

const MatrixEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Throttle resize events
    const throttleResize = () => {
      clearTimeout(window.resizeId);
      window.resizeId = setTimeout(resizeCanvas, 50);
    };

    window.addEventListener('resize', throttleResize);
    resizeCanvas();

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}.';
    const charsArray = characters.split('');
    const fontSize = window.innerWidth < 768 ? 10 : 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
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
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MatrixEffect;
