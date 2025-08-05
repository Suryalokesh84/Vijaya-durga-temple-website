import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {/* Main Circle with Om in Center and Diyas Around */}
        <div className="main-circle">
          {/* Rotating Diyas */}
          <div className="diyas-container">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`diya diya-${i + 1}`}>
                <div className="diya-flame">🕯️</div>
                <div className="diya-glow"></div>
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
        
        {/* Simple Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 