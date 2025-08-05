import { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [images] = useState([
    // Original images from images folder
    { url: '/images/temple1.jpg', title: 'Temple Image' },
    { url: '/images/temple2.jpg', title: 'Temple Image' },
    { url: '/images/temple3.jpg', title: 'Temple Image' },
    { url: '/images/temple4.jpg', title: 'Temple Image' },
    { url: '/images/temple5.jpg', title: 'Temple Image' },
    { url: '/images/temple11.jpg', title: 'Temple Image' },
    { url: '/images/image latest.jpg', title: 'Latest Temple Image' },
    { url: '/images/WhatsApp Image 2024-10-02 at 22.37.07_1d18ffad.jpg', title: 'Temple Celebration' },
    
    // New images from gallery pics folder
    { url: '/gallery pics/Temple Image 1.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Temple Image 2.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Temple Image 3.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Temple Image 4.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Temple Image 5.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Temple Image 6.jpg', title: 'Temple Image' },
    { url: '/gallery pics/Latest Temple Image.jpg', title: 'Latest Temple Image' },
    { url: '/gallery pics/Latest Temple Image (1).jpg', title: 'Latest Temple Image' },
    { url: '/gallery pics/Temple Celebration.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 1.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 2.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 3.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 4.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 5.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 6.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 7.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 8.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 9.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 10.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 11.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 12.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 13.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 14.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 15.jpg', title: 'Temple Celebration' },
    { url: '/gallery pics/Temple Celebration 16.jpg', title: 'Temple Celebration' },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  // Download the image
  const downloadImage = async (url, title) => {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${title}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the image', error);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading Gallery...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Temple Gallery</h1>
        <p>Explore the divine beauty of our temple through these sacred images</p>
      </div>
      
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openModal(image, index)}
          >
            <img 
              src={image.url} 
              alt={image.title}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="image-fallback" style={{ display: 'none' }}>
              <span>Image not available</span>
            </div>
            <div className="image-overlay">
              <h3>{image.title}</h3>
              <p>Click to view</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedImage.url} alt={selectedImage.title} />
            
            <div className="modal-navigation">
              <button onClick={prevImage} className="nav-button prev-button">
                ← Previous
              </button>
              <button 
                onClick={() => downloadImage(selectedImage.url, selectedImage.title)} 
                className="nav-button download-button"
              >
                📥 Download
              </button>
              <button onClick={nextImage} className="nav-button next-button">
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
