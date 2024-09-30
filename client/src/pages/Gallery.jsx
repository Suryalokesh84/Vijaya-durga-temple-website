import { useState } from 'react';
import axios from 'axios';
import './Gallery.css';  // Ensure your CSS is applied

const Gallery = () => {
  const [images] = useState([
    { url: 'https://i.imgur.com/cqp2uwB.jpeg', title: 'Image 1' },
    { url: 'https://i.imgur.com/WGOtVOK.jpeg', title: 'Image 2' },
    { url: 'https://i.imgur.com/hOPF0mw.jpeg', title: 'Image 3' },
    { url: 'https://i.imgur.com/k3baABH.jpg', title: 'Image 4' },
    { url: 'https://i.imgur.com/9aaohfE.jpeg', title: 'Image 5' },
    { url: 'https://i.imgur.com/zvWb0Ob.jpeg', title: 'Image 6' },
    { url: 'https://i.imgur.com/YCrX3Jy.jpeg', title: 'Image 7' },
    { url: 'https://i.imgur.com/eMAsbLa.jpeg', title: 'Image 8' },
    { url: 'https://i.imgur.com/mg1DN80.jpeg', title: 'Image 9' },
  ]);
  const [currentImage, setCurrentImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Open modal and display clicked image
  const openModal = (index) => {
    setCurrentImage(index);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Go to the next image
  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Go to the previous image
  const prevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Download the image using Blob to prevent redirection
  const downloadImage = async (url, title) => {
    try {
      const response = await axios({
        url, // Fetch image as blob
        method: 'GET',
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', title); // Image will download with the title
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the element
    } catch (error) {
      console.error('Error downloading the image', error);
    }
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <h2>Gallery</h2>

        <div className="image-grid">
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image.url} 
              alt={image.title} 
              className="gallery-image" 
              onClick={() => openModal(index)} 
            />
          ))}
        </div>

        {showModal && currentImage !== null && (
          <div className="image-modal">
            <span className="close-button" onClick={closeModal}>×</span>
            <img src={images[currentImage].url} alt={images[currentImage].title} />

            <div className="navigation">
              <button onClick={prevImage}>Previous</button>
              <button 
                onClick={() => downloadImage(images[currentImage].url, images[currentImage].title)} 
                className="download-button"
              >
                Download
              </button>
              <button onClick={nextImage}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
