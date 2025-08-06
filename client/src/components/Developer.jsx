import React, { useState, useEffect } from 'react';
import './Developer.css';

const Developer = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fullImageOpen, setFullImageOpen] = useState(false); // ✅ ADDED: state to manage full image view

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openFullImage = () => setFullImageOpen(true);   // ✅ ADDED
  const closeFullImage = () => setFullImageOpen(false); // ✅ ADDED

  if (!isVisible && !isOpen) return null;

  return (
    <>
      <div className={`developer-overlay ${isOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
        <div className="developer-modal" onClick={(e) => e.stopPropagation()}>
          <button 
            className="developer-close-btn" 
            onClick={handleClose}
            type="button"
            aria-label="Close developer modal"
          >
            <span>×</span>
          </button>
          
          <div className="developer-content">
            <div className="developer-header">
              <h2>🛠️ Developer</h2>
              <p>Website Creator & Maintainer</p>
            </div>
            
            <div className="developer-profile">
              <div className="developer-image-container" onClick={openFullImage}> {/* ✅ ADDED */}
                <img 
                  src="/owner_web.jpg" 
                  alt="Developer/Owner" 
                  className="developer-image"
                />
              </div>
              
              <div className="developer-info">
                <h3>Website Developer</h3>
                <p className="developer-description">
                  Dedicated to creating beautiful and functional websites for temples and spiritual organizations.
                </p>
              </div>
            </div>
            
            <div className="developer-skills">
              <h4>🛠️ Technologies Used</h4>
              <div className="skills-grid">
                <div className="skill-item">
                  <span className="skill-icon">⚛️</span>
                  <span>React.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🎨</span>
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🚀</span>
                  <span>Vite</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">📱</span>
                  <span>Responsive</span>
                </div>
              </div>
            </div>
            
            <div className="developer-footer">
              <p>🙏 Thank you for visiting our temple website</p>
              <p>May the divine blessings be with you always</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FULL IMAGE MODAL ADDED BELOW */}
      {fullImageOpen && (
        <div className="full-image-overlay" onClick={closeFullImage}>
          <img src="/owner_web.jpg" alt="Full View" className="full-image" />
        </div>
      )}
    </>
  );
};

export default Developer;
