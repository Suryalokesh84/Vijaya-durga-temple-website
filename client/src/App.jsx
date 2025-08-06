// src/App.jsx

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import About from './pages/About';
import Payments from './pages/Payments';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations'; // Import your Donations component
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './Main.css'; // Import main CSS for global styles

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only preload essential home page images for faster loading
    const loadEssentialImages = () => {
      const essentialImageUrls = [
        '/images/image latest.jpg',
        '/images/temple1.jpg',
        '/images/temple2.jpg',
        '/images/temple3.jpg'
      ];

      const imagePromises = essentialImageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url); // Continue even if some images fail
          img.src = url;
        });
      });

      // Wait for essential images with a timeout to prevent long waits
      Promise.allSettled(imagePromises).then(() => {
        // Add a small delay for smooth transition (0.5 seconds)
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });

      // Fallback timeout - if images take too long, show website anyway
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Maximum 2 seconds wait
    };

    loadEssentialImages();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
