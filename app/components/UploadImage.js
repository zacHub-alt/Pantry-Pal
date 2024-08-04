// components/UploadImage.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { storage } from '../../utils/firebase'; // Ensure Firebase Storage is configured

const UploadImage = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = storage.ref(`images/${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      onUpload(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} variant="contained" color="primary">
        Upload Image
      </Button>
    </div>
  );
};

export default UploadImage;
