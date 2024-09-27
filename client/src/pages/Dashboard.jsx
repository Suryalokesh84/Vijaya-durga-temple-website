import { useEffect, useState } from 'react';
import axios from 'axios';
import DonationForm from './DonationForm'; // Assuming you have this form component

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donations');
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const addDonation = (newDonation) => {
    // Update the donations list with the new donation
    setDonations((prevDonations) => [...prevDonations, newDonation]);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <DonationForm addDonation={addDonation} /> {/* Pass the addDonation function to the form */}
      <h3>Current Donations</h3>
      <table border="1">
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
                  <img src={donation.image} alt={donation.name} style={{ width: '50px', height: '50px' }} />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
