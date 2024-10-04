import { useState } from 'react';
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
  // Manually entered donations data
  const [donations] = useState([
    { _id: 1, name: 'ఎమ్ నాగరాజు ప్రసాద్ గారు (పెదపట్నం లంక)', amount: 15116, image: 'https://i.imgur.com/GDCLVOu.jpeg' },
    { _id: 2, name: 'మట్టపర్తి బాబీ గారు (ఎంట్రికోన)', amount: 5116, image: 'https://i.imgur.com/YMHxeOH.jpeg' },
    { _id: 3, name: 'వాసర్ల శ్రీనివాస్ రావు గారు (ఎంట్రికోన)', amount: 5000, image: 'https://i.imgur.com/Flc3a0x.jpeg' },
    { _id: 4, name: 'గుత్తుల శ్రీనివాస్ గారు (ఎన్. కొత్తపల్లి)', amount: 3000, image: '' },
    { _id: 5, name: 'వాసర్ల సూర్యనారాయణ గారు (ఎంట్రికోన)', amount: 1116, image: 'https://i.imgur.com/gcNtqVF.jpeg' },
    { _id: 6, name: 'విత్తనాల సత్యనారాయణ గారు  (ఎన్. కొత్తపల్లి)', amount: 1116, image: 'https://i.imgur.com/Fmroj4j.jpeg' },

  ]);

  const [visibleImages, setVisibleImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal

  // Function to toggle the visibility of an image
  const toggleImageVisibility = (id) => {
    setVisibleImages((prevVisibleImages) => ({
      ...prevVisibleImages,
      [id]: !prevVisibleImages[id], // Toggle visibility
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

