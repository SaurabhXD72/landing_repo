import React from 'react';

const Logo = ({ className = "w-8 h-8", animate = true }) => {
  return (
    <div className={`${className} relative inline-block`}>
      <div className={`logo-container ${animate ? 'logo-animate' : ''}`}>
        {/* S */}
        <span className="logo-letter letter-s">S</span>
        {/* D */}
        <span className="logo-letter letter-d">D</span>
      </div>
      
      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          font-weight: 400;
          letter-spacing: 0.1em;
        }
        
        .logo-letter {
          display: inline-block;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
          transition: all 0.3s ease;
        }
        
        .logo-animate .logo-letter {
          animation: goldenGlow 3s ease-in-out infinite;
        }
        
        .letter-s {
          animation-delay: 0s;
        }
        
        .letter-d {
          animation-delay: 1.5s;
        }
        
        @keyframes goldenGlow {
          0%, 100% { 
            color: #ffffff;
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
            transform: scale(1);
          }
          50% { 
            color: #fbbf24;
            text-shadow: 
              0 0 20px rgba(251, 191, 36, 0.8),
              0 0 30px rgba(251, 191, 36, 0.6),
              0 0 40px rgba(251, 191, 36, 0.4);
            transform: scale(1.05);
          }
        }
        
        .logo-container:hover .logo-letter {
          color: #fbbf24;
          text-shadow: 
            0 0 15px rgba(251, 191, 36, 0.8),
            0 0 25px rgba(251, 191, 36, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Logo;