// components/ImageUploaderWithRecognition.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import UploadImage from './UploadImage';
import { recognizeImage } from '../../utils/imageRecognition';

const ImageUploaderWithRecognition = () => {
  const [labels, setLabels] = useState([]);

  const handleUpload = async (url) => {
    try {
      const recognitionResult = await recognizeImage(url);
      setLabels(recognitionResult.responses[0].labelAnnotations.map((label) => label.description));
    } catch (error) {
      console.error('Error during image recognition:', error);
    }
  };

  return (
    <div>
      <UploadImage onUpload={handleUpload} />
      <Typography variant="h6">Recognized Labels:</Typography>
      <ul>
        {labels.map((label, index) => (
          <li key={index}>{label}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUploaderWithRecognition;
