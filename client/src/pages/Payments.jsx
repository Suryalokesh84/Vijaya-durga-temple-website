// Payments.jsx
// import React from 'react';
import './Payments.css';  // Create a separate CSS file for styling

const Payments = () => {
  return (
    <div className="payments-container">
      <h1 className="payment-header">CLICK ON THE BELOW LINK TO DONATE</h1>
      <p className="payment-instruction">Please fill out your details and upload a screenshot of your donation.</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZkU9qr1AeDRZz5lKvMBjKqlJ388xrghBrG9ei6qtJViFBvw/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="payment-link">Donate Now</a>
    </div>
  );
};

export default Payments;
