import { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationForm.css';

const DonationForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState('');
  const [deleteSerial, setDeleteSerial] = useState(''); // State for the serial number to delete
  const [donations, setDonations] = useState([]);

  // Fetch donations when the component loads
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('https://vijaya-durga-temple-website-org.onrender.com');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      name,
      amount,
      image,
    };

    try {
      await axios.post('https://vijaya-durga-temple-website-org.onrender.com', donationData);
      alert('Donation submitted successfully');
      // Clear the form fields after submission
      setName('');
      setAmount('');
      setImage('');
      // Refresh donations
      const response = await axios.get('https://vijaya-durga-temple-website-org.onrender.com');
      setDonations(response.data);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const serial = parseInt(deleteSerial); // Convert serial number to integer
    if (serial <= 0 || serial > donations.length) {
      alert('Invalid serial number');
      return;
    }
    // Get the donation to delete by its position (serial number)
    const donationToDelete = donations[serial - 1]; // Array is zero-indexed
    try {
      await axios.delete(`https://vijaya-durga-temple-website-org.onrender.com${donationToDelete._id}`);
      alert(`Donation with Serial ${serial} deleted successfully`);
      setDeleteSerial(''); // Clear the delete serial field
      // Fetch the updated donations list after deletion
      const response = await axios.get('https://vijaya-durga-temple-website-org.onrender.com');
      setDonations(response.data);
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation. Please try again.');
    }
  };

  return (
    <div className="donation-form">
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Optional"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="submit-button">Submit Donation</button>
      </form>

      {/* Section for displaying donations and deleting by serial number */}
      <h2>Delete a Donation by Serial Number</h2>
      <form onSubmit={handleDelete}>
        <div className="input-group">
          <label>Serial Number to Delete:</label>
          <input
            type="number"
            value={deleteSerial}
            onChange={(e) => setDeleteSerial(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <button type="submit" className="delete-button">Delete Donation</button>
      </form>

      <h2>Donation List</h2>
      <table>
  <thead>
    <tr>
      <th>Serial</th>
      <th>Name</th>
      <th>Amount</th>
      <th>Image</th>
    </tr>
  </thead>
  <tbody>
    {donations.map((donation, index) => (
      <tr key={donation._id}>
        <td>{index + 1}</td> {/* Serial number */}
        <td>{donation.name}</td>
        <td>{donation.amount}</td>
        <td>
          {donation.image ? (
            <img src={donation.image} alt={donation.name} width="50" />
          ) : (
            'No image'
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default DonationForm;
