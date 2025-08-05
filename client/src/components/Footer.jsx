// src/components/Footer.jsx

import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top handler
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down more than 500px (adjust this value as needed)
      const scrollPosition = window.scrollY;
      setShowBackToTop(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Your existing footer content here if any */}
      {showBackToTop && (
        <button 
          className="back-to-top-btn" 
          onClick={handleBackToTop} 
          title="Back to Top"
          style={{
            opacity: showBackToTop ? 1 : 0,
            visibility: showBackToTop ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          }}
        >
          ⬆️ Top
        </button>
      )}
    </>
  );
};

export default Footer;
