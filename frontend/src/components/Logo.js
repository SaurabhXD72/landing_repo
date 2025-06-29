import React from 'react';

const Logo = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <div className={`${className} relative inline-block`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${animate ? 'logo-animate' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Handwritten-style "S" - more precise and clean */}
        <path
          d="M 25 30 Q 20 20 30 20 Q 40 20 40 30 Q 40 40 30 40 Q 20 40 20 50 Q 20 60 30 60 Q 40 60 35 70"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="letter-stroke letter-s"
        />
        
        {/* Handwritten-style "D" - precise vertical line with clean curve */}
        <g className="letter-stroke letter-d" filter="url(#glow)">
          <path
            d="M 60 25 L 60 65"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 60 25 Q 75 25 75 45 Q 75 65 60 65"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      
      <style jsx>{`
        .letter-stroke {
          transition: all 0.3s ease;
        }
        
        .logo-animate .letter-s {
          animation: handwrittenGlow 4s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .logo-animate .letter-d {
          animation: handwrittenGlow 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        @keyframes handwrittenGlow {
          0%, 100% { 
            stroke: #ffffff;
            filter: url(#glow) drop-shadow(0 0 3px rgba(251, 191, 36, 0.3));
          }
          50% { 
            stroke: #fbbf24;
            filter: url(#glow) drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));
          }
        }
        
        /* Hover effect */
        .logo-animate:hover .letter-stroke {
          stroke: #fbbf24;
          filter: url(#glow) drop-shadow(0 0 6px rgba(251, 191, 36, 0.6));
        }
      `}</style>
    </div>
  );
};

export default Logo;