const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize the express app
const app = express();

// Middleware
// 1. Enable CORS (Cross-Origin Resource Sharing) so your frontend (React app) can communicate with your backend
app.use(cors());

// 2. This middleware is required to parse incoming JSON requests from the frontend
// It will parse the body of POST requests and make it available in req.body
app.use(express.json());

// MongoDB connection
// Replace <username>, <password>, and <dbname> with your MongoDB Atlas connection details
const mongoURI = "mongodb+srv://suryalokeshh:qwerty1234@cluster0.zz4y8.mongodb.net/Templedatabase?retryWrites=true&w=majority&appName=Cluster0"


// Connect to MongoDB Atlas using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,      // Use the new URL parser (old parser is deprecated)
  useUnifiedTopology: true,   // Enable the new connection management engine
})
.then(() => console.log('MongoDB connected'))  // Success message if connection is established
.catch((error) => console.log('MongoDB connection error:', error));  // Error handling if connection fails

// Define the schema for donations in MongoDB
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },   // Name of the donor, required field
  amount: { type: Number, required: true }, // Donation amount, required field
  image: { type: String },                  // Image URL (optional field)
});

// Create a model for the 'donations' collection
const Donation = mongoose.model('Donation', donationSchema);

// API Routes

// Route to get all donations (HTTP GET)
// This will fetch all donations from the database and send them as a JSON response
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch all donation documents from the collection
    res.json(donations);                     // Return the donations as JSON
  } catch (error) {
    console.error("Error fetching donations:", error); // Log any errors
    res.status(500).json({ error: "An error occurred while fetching donations" }); // Send 500 status code for server errors
  }
});

app.delete('/api/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to create a new donation (HTTP POST)
// This will receive donation data from the frontend, validate it, and save it to the MongoDB collection
app.post('/api/donations', async (req, res) => {
  const { name, amount, image } = req.body;  // Destructure the name, amount, and image from the request body

  // Basic validation to ensure required fields are provided
  if (!name || !amount) {
    return res.status(400).json({ error: "Name and amount are required" }); // Send 400 status code for bad requests
  }

  try {
    // Create a new donation object using the data from the request
    const newDonation = new Donation({ name, amount, image });
    
    // Save the donation to MongoDB
    await newDonation.save();

    // Send back the saved donation as a response
    res.status(201).json(newDonation);  // 201 status code indicates successful creation of a new resource
  } catch (error) {
    console.error("Error saving donation:", error);  // Log any errors
    res.status(500).json({ error: "An error occurred while saving the donation" }); // Send 500 status code for server errors
  }
});

// Define the schema for images in MongoDB
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },     // Image URL, required field
  title: { type: String, required: true },   // Image title, required field
});

// Create a model for the 'images' collection
const Image = mongoose.model('Image', imageSchema);

// Route to get all images (HTTP GET)
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find(); // Fetch all image documents from the collection
    res.json(images);                  // Return the images as JSON
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "An error occurred while fetching images" });
  }
});

// Route to upload a new image (HTTP POST)
app.post('/api/images', async (req, res) => {
  const { url, title } = req.body; // Destructure the URL and title from the request body

  // Basic validation to ensure required fields are provided
  if (!url || !title) {
    return res.status(400).json({ error: "URL and title are required" });
  }

  try {
    // Create a new image object using the data from the request
    const newImage = new Image({ url, title });

    // Save the image to MongoDB
    await newImage.save();

    // Send back the saved image as a response
    res.status(201).json(newImage); // 201 status code indicates successful creation of a new resource
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "An error occurred while saving the image" });
  }
});

// Start the server
const port = process.env.PORT || 5000;  // Use port from environment variables, or default to 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Log the port the server is running on
});
