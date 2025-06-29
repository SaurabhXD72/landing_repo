import React from 'react';

const Logo = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${animate ? 'logo-glow' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with gradient */}
        <defs>
          <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          className="logo-ring"
        />
        
        {/* Inner design - stylized "SD" */}
        <g filter="url(#glow)">
          {/* S shape */}
          <path
            d="M 25 35 Q 25 25 35 25 Q 45 25 45 35 Q 45 45 35 45 Q 25 45 25 55 Q 25 65 35 65 Q 45 65 45 55"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
            className="letter-s"
          />
          
          {/* D shape */}
          <path
            d="M 60 25 L 60 65 M 60 25 Q 75 25 75 45 Q 75 65 60 65"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
            className="letter-d"
          />
        </g>
        
        {/* Decorative dots */}
        <circle cx="20" cy="20" r="1.5" fill="#fbbf24" className="dot dot-1" />
        <circle cx="80" cy="20" r="1.5" fill="#f59e0b" className="dot dot-2" />
        <circle cx="20" cy="80" r="1.5" fill="#f59e0b" className="dot dot-3" />
        <circle cx="80" cy="80" r="1.5" fill="#fbbf24" className="dot dot-4" />
      </svg>
      
      <style jsx>{`
        .logo-glow {
          filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6));
        }
        
        .logo-ring {
          animation: rotate 20s linear infinite;
          transform-origin: 50px 50px;
        }
        
        .letter-s, .letter-d {
          animation: pulse-stroke 3s ease-in-out infinite;
        }
        
        .letter-d {
          animation-delay: 0.5s;
        }
        
        .dot {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.5s; }
        .dot-3 { animation-delay: 1s; }
        .dot-4 { animation-delay: 1.5s; }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-stroke {
          0%, 100% { 
            stroke-opacity: 0.8;
            stroke-width: 3;
          }
          50% { 
            stroke-opacity: 1;
            stroke-width: 3.5;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;