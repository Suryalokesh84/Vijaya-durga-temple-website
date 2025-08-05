import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to scroll to section on home page
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsOpen(false);
  };

  // Function to handle logo click - navigate to home and scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on other page, navigate to home
      navigate('/');
    }
    setIsOpen(false);
  };

  return (
    <nav ref={menuRef} className={`navbar ${isOpen ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className={`nav-container${!isMobile ? ' nav-center-desktop' : ''}`}>
        {/* Logo Section - clickable, centered on desktop */}
        <Link to="/" className="nav-logo" onClick={handleLogoClick} style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            <span className="temple-icon">🕉️</span>
          </div>
          <div className="logo-text">
            <h1>శ్రీ విజయ దుర్గ అమ్మవారి దేవాలయం</h1>
          </div>
        </Link>
        {/* Hamburger Menu - Only show on mobile */}
        {isMobile && (
          <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {/* Navigation Links */}
        <ul className={`nav-menu ${isMobile ? 'mobile-menu' : 'desktop-menu'}`}>
          {/* Desktop: Only Gallery */}
          {!isMobile && (
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('gallery-section')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span className="nav-icon">🖼️</span>
                <span className="nav-text">Gallery</span>
              </button>
            </li>
          )}
          {/* Mobile: All menu items */}
          {isMobile && (
            <>
              <li className="nav-item">
                <button 
                  className="nav-link" 
                  onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">Home</span>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link" 
                  onClick={() => scrollToSection('about-section')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span className="nav-icon">ℹ️</span>
                  <span className="nav-text">About</span>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link" 
                  onClick={() => scrollToSection('payments-section')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span className="nav-icon">💳</span>
                  <span className="nav-text">Payments</span>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link" 
                  onClick={() => scrollToSection('donations-section')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <span className="nav-icon">🙏</span>
                  <span className="nav-text">Donations</span>
                </button>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
                  <span className="nav-icon">📞</span>
                  <span className="nav-text">Contact</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                  <span className="nav-icon">🔐</span>
                  <span className="nav-text">Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
