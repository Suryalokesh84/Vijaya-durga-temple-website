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
    // Simulate loading time for images and content
    const loadImages = () => {
      const imageUrls = [
        '/images/image latest.jpg',
        '/images/WhatsApp Image 2024-10-02 at 22.37.07_1d18ffad.jpg',
        '/images/temple1.jpg',
        '/images/temple2.jpg',
        '/images/temple3.jpg',
        '/images/temple4.jpg',
        '/images/temple5.jpg',
        '/images/temple11.jpg',
        '/donations pics/1.jpg',
        '/donations pics/2.jpg',
        '/donations pics/3.jpg',
        '/donations pics/5.jpg',
        '/donations pics/6.jpg'
      ];

      const imagePromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url); // Continue even if some images fail
          img.src = url;
        });
      });

      // Wait for all images to load or timeout after 5 seconds
      Promise.allSettled(imagePromises).then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000); // Minimum 4 seconds of loading animation
      });
    };

    loadImages();
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
