import { useState, useEffect, useRef } from 'react'; // Add useEffect and useRef
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the navbar

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      <h1>శ్రీ విజయ దుర్గ దేవాలయం</h1>
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
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
