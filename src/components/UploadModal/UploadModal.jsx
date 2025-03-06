import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadWithProcessing = () => {
    fileInputRef.current.click();
  };

  const handleFileupload = async(event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kalanjiyam");
    data.append("cloud_name", "dyggpacf1");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dyggpacf1/image/upload", {
            method: "POST",
            body: data
        });

        const uploadedImageUrl = await res.json();
        console.log(uploadedImageUrl.url);
        navigate('/uploadpage', { state: { imageUrl: uploadedImageUrl.url } });

    } catch (error) {
        console.error("Error uploading file:", error);
        alert('Error uploading file. Please try again.');
    } finally {
        setIsUploading(false);
    }
  };

  const handleUploadWithoutProcessing = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Choose Upload Type</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="upload-options">
          <input 
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileupload}
            accept="image/*"
          />
          
          <button 
            className="upload-option-btn"
            onClick={handleUploadWithoutProcessing}
            disabled={isUploading}
          >
            <i className="fas fa-file-upload"></i>
            <span>{isUploading ? 'Uploading...' : 'Upload Without Processing'}</span>
            <p>Direct upload without image enhancement</p>
          </button>

          <button 
            className="upload-option-btn"
            onClick={handleUploadWithProcessing}
            disabled={isUploading}
          >
            <i className="fas fa-magic"></i>
            <span>{isUploading ? 'Uploading...' : 'Upload With Processing'}</span>
            <p>Enhanced upload with image processing</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal; 