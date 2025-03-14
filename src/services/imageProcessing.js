const processSRCNN = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('http://localhost:5000/api/enhance-image', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Image processing failed');
    }

    const processedImageBlob = await response.blob();
    return new File([processedImageBlob], `enhanced_${imageFile.name}`, {
      type: 'image/jpeg'
    });
  } catch (error) {
    console.error('SRCNN Processing Error:', error);
    throw error;
  }
};

export { processSRCNN };