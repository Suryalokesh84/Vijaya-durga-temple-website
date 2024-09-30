import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the navbar
  const navigate = useNavigate(); // Initialize the navigate hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to navigate to the Gallery page when the button is clicked
  const goToGallery = () => {
    navigate('/gallery'); // Programmatically navigate to /gallery
  };

  // Close the menu when clicking outside of the menu area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup on unmount
    };
  }, []);

  return (
    <nav ref={menuRef} className={`navbar ${isOpen ? 'active' : ''}`}>
      <h1>శ్రీ విజయ దుర్గ అమ్మవారి దేవాలయం</h1>
      
      {/* Button to go to Gallery */}
      <button className="btn" onClick={goToGallery}>Gallery</button>

      {/* Hamburger menu icon */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
        <li><Link to="/payments" onClick={toggleMenu}>Payments</Link></li>
        <li><Link to="/donations" onClick={toggleMenu}>Donations</Link></li>
        <li><Link to="/gallery" onClick={toggleMenu}>Gallery</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
