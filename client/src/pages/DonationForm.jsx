import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Donations.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Modal component to show full-screen image
const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <img src={src} alt={alt} className="full-screen-image" />
        <span className="modal-close" onClick={onClose}>&times;</span> {/* Close button */}
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [visibleImages, setVisibleImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donations');
      // Sort donations by amount in descending order
      const sortedDonations = response.data.sort((a, b) => b.amount - a.amount);
      setDonations(sortedDonations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Failed to fetch donations. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to toggle the visibility of an image
  const toggleImageVisibility = (id) => {
    setVisibleImages((prevVisibleImages) => ({
      ...prevVisibleImages,
      [id]: !prevVisibleImages[id] // Toggle visibility
    }));
  };

  // Function to open the modal with the clicked image
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Function to open image in new tab
  const openImageInNewTab = (imageSrc) => {
    window.open(imageSrc, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading donations...</div>; // Loading indicator
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <div className="donations-container">
      <h2>Donations</h2>
      <table className="donations-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td>{index + 1}</td>
              <td>{donation.name}</td>
              <td>{donation.amount}</td>
              <td>
                {donation.image ? (
                  <div>
                    {visibleImages[donation._id] ? (
                      <>
                        <img
                          src={donation.image}
                          alt={donation.name}
                          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                          onClick={() => openModal(donation.image)} // Open modal when clicked
                          role="button" // Accessibility role
                          tabIndex={0} // Make it focusable
                          onKeyDown={(e) => { if (e.key === 'Enter') openModal(donation.image); }} // Enter key functionality
                        />
                        <FaEyeSlash
                          onClick={() => toggleImageVisibility(donation._id)}
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          title="Hide Image"
                        />
                      </>
                    ) : (
                      <FaEye
                        onClick={() => {
                          toggleImageVisibility(donation._id);
                          openImageInNewTab(donation.image); // Open image in new tab when eye is clicked
                        }}
                        style={{ cursor: 'pointer' }}
                        title="Show Image"
                      />
                    )}
                  </div>
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the modal when an image is clicked */}
      {selectedImage && (
        <ImageModal src={selectedImage} alt="Donation Image" onClose={closeModal} />
      )}
    </div>
  );
};

export default DonationsList;
