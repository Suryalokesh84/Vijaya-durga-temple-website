import { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';  // Make sure to add or update CSS styles

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Fetch images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://vijaya-durga-temple-website.onrender.com/api/images');
        setImages(response.data); // Set the fetched images in the state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

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

  // Add a new image (POST request to backend)
  const addImage = async (e) => {
    e.preventDefault();
    if (newImageUrl && newImageTitle) {
      const newImage = { url: newImageUrl, title: newImageTitle };

      try {
        const response = await axios.post('https://vijaya-durga-temple-website.onrender.com/api/images', newImage);
        setImages([...images, response.data]); // Update the state with the new image
        setNewImageUrl('');                    // Clear the form fields
        setNewImageTitle('');
        setShowForm(false);                    // Hide the form
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <h2>Gallery</h2>

        <div className="image-grid">
          {images.map((image, index) => (
            <img 
              key={image._id} 
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

      <div className="button-container">
        <button className="toggle-form-button" onClick={toggleForm}>
          {showForm ? 'Hide Form' : 'Add New Image'}
        </button>

        {showForm && (
          <form onSubmit={addImage} className="add-image-form">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter image URL"
              required
            />
            <input
              type="text"
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
              placeholder="Enter image title"
              required
            />
            <button type="submit" className="submit-button">Add Image</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Gallery;
