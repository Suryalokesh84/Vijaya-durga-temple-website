import  { useState } from 'react';
import axios from 'axios'; // You can use axios or fetch API

const UpdateGalleryForm = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);

    if (file) {
      // If the user is uploading a file
      formData.append('image', file);
    } else {
      // If the user is providing an image URL
      formData.append('url', imageUrl);
    }

    try {
      const response = await axios.post('/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setTitle('');
        setImageUrl('');
        setFile(null);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="update-gallery-form">
      <h2>Update Gallery</h2>
      {success && <p>Image uploaded successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Image Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (optional)</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Image (optional)</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default UpdateGalleryForm;
