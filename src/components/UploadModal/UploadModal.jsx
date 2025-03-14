import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processSRCNN } from '../../services/imageProcessing';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kalanjiyam");
    data.append("cloud_name", "dyggpacf1");

    const res = await fetch("https://api.cloudinary.com/v1_1/dyggpacf1/image/upload", {
      method: "POST",
      body: data
    });

    return await res.json();
  };

  const handleFileUpload = async (event, shouldProcess = false) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      let fileToUpload = file;

      if (shouldProcess) {
        setIsProcessing(true);
        fileToUpload = await processSRCNN(file);
        setIsProcessing(false);
      }

      const uploadedImage = await uploadToCloudinary(fileToUpload);
      navigate('/uploadpage', { state: { imageUrl: uploadedImage.url } });

    } catch (error) {
      console.error("Error:", error);
      alert('Error processing/uploading file. Please try again.');
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const handleUploadWithProcessing = () => {
    fileInputRef.current.click();
    fileInputRef.current.onchange = (e) => handleFileUpload(e, true);
  };

  const handleUploadWithoutProcessing = () => {
    fileInputRef.current.click();
    fileInputRef.current.onchange = (e) => handleFileUpload(e, false);
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
            accept="image/*"
          />
          
          <button 
            className="upload-option-btn"
            onClick={handleUploadWithoutProcessing}
            disabled={isUploading || isProcessing}
          >
            <i className="fas fa-file-upload"></i>
            <span>{isUploading ? 'Uploading...' : 'Upload Without Processing'}</span>
            <p>Direct upload without image enhancement</p>
          </button>

          <button 
            className="upload-option-btn"
            onClick={handleUploadWithProcessing}
            disabled={isUploading || isProcessing}
          >
            <i className="fas fa-magic"></i>
            <span>
              {isProcessing ? 'Processing...' : 
               isUploading ? 'Uploading...' : 
               'Upload With SRCNN Processing'}
            </span>
            <p>Enhanced upload with SRCNN image upscaling</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal; 