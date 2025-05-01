import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useArtworks } from '../contexts/ArtworksContext';
import { CloudUpload, Description } from '@mui/icons-material';
import './UploadPage.css';

function ArtworkSubmissionPage() {
  const navigate = useNavigate();
  const { user, getDisplayName } = useAuth();
  const { addArtwork } = useArtworks();
  const fileInputRef = useRef(null);
  const [artworkDetails, setArtworkDetails] = useState({
    title: '',
    description: '',
    category: '',
    style: '',
    price: 299 
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropActive, setIsDropActive] = useState(false);

  const updateArtworkField = (e) => {
    const { name, value } = e.target;
    setArtworkDetails(previousDetails => ({ ...previousDetails, [name]: value }));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDropActive) {
      setIsDropActive(true);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const processUploadedFile = (uploadedFile) => {
    if (!uploadedFile) {
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }
    if (!uploadedFile.type.match('image.*')) {
      setErrorMessage('Please select an image file (PNG, JPG, JPEG, GIF)');
      return;
    }
    if (uploadedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size should be less than 5MB');
      return;
    }
    setErrorMessage('');
    setSelectedFile(uploadedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleFileSelection = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setErrorMessage('');
  };

  const submitArtwork = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select an image to upload');
      return;
    }
    if (!artworkDetails.title.trim()) {
      setErrorMessage('Please provide a title for your artwork');
      return;
    }
    if (!artworkDetails.category) {
      setErrorMessage('Please select a category for your artwork');
      return;
    }
    if (!artworkDetails.style) {
      setErrorMessage('Please select a style for your artwork');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const newArtworkEntry = {
        title: artworkDetails.title,
        description: artworkDetails.description,
        category: artworkDetails.category,
        style: artworkDetails.style,
        price: parseInt(artworkDetails.price) || 299, 
        artist: getDisplayName() || 'Anonymous Artist',
        imageUrl: imagePreview, 
        fullImageUrl: imagePreview, 
      };
      const createdArtworkId = addArtwork(newArtworkEntry);
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(`/artwork/${createdArtworkId}`);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Upload failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const availableCategories = [
    'Digital Art', 'Photography', 'Painting', 'Illustration', 
    'Sculpture', '3D Art', 'Concept Art', 'Pixel Art', 'Other'
  ];

  const availableStyles = [
    'Abstract', 'Realistic', 'Impressionist', 'Expressionist', 
    'Surrealist', 'Minimalist', 'Pop Art', 'Fantasy', 'Other'
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Share Your Artwork</h1>
        <p>Upload your creative masterpiece and share it with our community of artists and enthusiasts.</p>
      </div>
      <div className="upload-layout">
        <div className="upload-section">
          <h2>Upload Artwork</h2>
          <div 
            className={`dropzone ${isDropActive ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            onClick={() => !imagePreview && fileInputRef.current.click()}
          >
            {!imagePreview ? (
              <div className="dropzone-content">
                <div className="upload-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 16L12 12L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.39 18.39C21.3654 17.8583 22.1359 17.0169 22.5799 15.9986C23.024 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9435 10.7355 21.0667 10.0534C20.1899 9.37138 19.1109 9.00073 18 9.00001H16.74C16.4373 7.82926 15.8731 6.74235 15.0899 5.82099C14.3067 4.89963 13.3248 4.16785 12.2181 3.68061C11.1114 3.19336 9.90856 2.96639 8.70011 3.01459C7.49166 3.06279 6.30907 3.38511 5.24114 3.95491C4.17322 4.5247 3.24772 5.32792 2.53064 6.30359C1.81355 7.27925 1.32851 8.40413 1.11323 9.60182C0.897946 10.7995 0.95834 12.0312 1.28199 13.2001C1.60564 14.369 2.18266 15.4634 2.97 16.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="dropzone-title">Drag and drop your artwork</p>
                <p className="dropzone-subtitle">PNG, JPG, GIF files up to 5MB</p>
                <button className="browse-button">
                  Browse Files
                </button>
              </div>
            ) : (
              <img src={imagePreview} alt="Artwork preview" className="preview-image" />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelection}
            className="file-input"
          />
          <div className="file-status">
            <Description fontSize="small" />
            <span>{selectedFile ? selectedFile.name : 'No file selected'}</span>
            {selectedFile && (
              <button onClick={clearSelectedFile} className="clear-file-button">
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="details-section">
          <h2>Artwork Details</h2>
          <form onSubmit={submitArtwork}>
            <div className="form-group">
              <label htmlFor="title">Artwork Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={artworkDetails.title}
                onChange={updateArtworkField}
                placeholder="Enter title of your artwork"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={artworkDetails.description}
                onChange={updateArtworkField}
                placeholder="Describe your artwork, inspiration, techniques used, etc."
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="category">Category</label>
                <div className="select-container">
                  <select
                    id="category"
                    name="category"
                    value={artworkDetails.category}
                    onChange={updateArtworkField}
                  >
                    <option value="">Select a category</option>
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group half">
                <label htmlFor="style">Style</label>
                <div className="select-container">
                  <select
                    id="style"
                    name="style"
                    value={artworkDetails.style}
                    onChange={updateArtworkField}
                  >
                    <option value="">Select a style</option>
                    {availableStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                step="1"
                value={artworkDetails.price}
                onChange={updateArtworkField}
                placeholder="Enter price in rupees"
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button 
              type="submit" 
              className="upload-button" 
              disabled={isSubmitting || !selectedFile}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Artwork'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtworkSubmissionPage;