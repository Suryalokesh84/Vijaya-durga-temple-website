import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {/* Main Circle with Om in Center and Deepaks Around */}
        <div className="main-circle">
          {/* Rotating Deepaks */}
          <div className="deepaks-container">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`deepak deepak-${i + 1}`}>
                <div className="deepak-flame">🪔</div>
                <div className="deepak-glow"></div>
              </div>
            ))}
          </div>
          
          {/* Central Om Symbol */}
          <div className="om-center">
            <div className="om-symbol">🕉️</div>
            <div className="om-glow"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="loading-text">
          <h3>శ్రీ విజయ దుర్గ అమ్మవారి దేవాలయం</h3>
          <p>Loading Divine Blessings...</p>
        </div>
        
        {/* Slow Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 