'use client';
import React, { useRef, useEffect } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 650;

    const hindi = 'अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = hindi + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      // The semi-transparent background creates the fading trail for characters from previous frames
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // --- THIS IS THE KEY CHANGE ---
        // Create a vertical gradient for each new character (the "head" of the drop)
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
        gradient.addColorStop(0, '#cceeff'); // Bright, light cyan/white at the top
        gradient.addColorStop(0.8, '#0F0');   // Fades to classic green
        
        // Use the gradient as the fill style
        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);

        // Reset the drop to the top of the screen randomly
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full object-cover max-h-[650px] z-0" 
    />
  );
};

export default MatrixBackground;