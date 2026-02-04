import React from 'react';

const Loader = () => {
  return (
    <>
      {/* This style tag contains all the CSS for the new animations */}
      <style jsx global>{`
        .loader-background {
          --grid-size: 50px;
          --grid-color: rgba(0, 255, 255, 0.1);
          background-image:
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
          background-size: var(--grid-size) var(--grid-size);
          animation: bg-pan 4s linear infinite;
        }

        @keyframes bg-pan {
          from {
            background-position: 0 0;
          }
          to {
            background-position: var(--grid-size) 0;
          }
        }
        
        .glitch-container {
          position: relative;
        }

        .glitch-text {
          font-family: 'Helvetica Neue', sans-serif;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: white;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9;
          animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(5% 0 90% 0); }
          20% { clip-path: inset(80% 0 5% 0); }
          40% { clip-path: inset(25% 0 60% 0); }
          60% { clip-path: inset(95% 0 2% 0); }
          80% { clip-path: inset(45% 0 45% 0); }
          100% { clip-path: inset(70% 0 10% 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(90% 0 5% 0); }
          20% { clip-path: inset(5% 0 80% 0); }
          40% { clip-path: inset(60% 0 25% 0); }
          60% { clip-path: inset(2% 0 95% 0); }
          80% { clip-path: inset(45% 0 45% 0); }
          100% { clip-path: inset(10% 0 70% 0); }
        }
      `}</style>

      {/* The Loader's JSX structure */}
      <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black loader-background">
        <div className="text-center">
          <div className="glitch-container">
            <h1 
              className="text-6xl sm:text-7xl glitch-text" 
              data-text="OWASP"
            >
              OWASP
            </h1>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2">
            Chapter MANIT
          </p>
        </div>
      </div>
    </>
  );
};

export default Loader;