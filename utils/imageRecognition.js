// utils/imageRecognition.js
import axios from 'axios';

const GOOGLE_VISION_API_KEY = 'AIzaSyANJoj7GIWn2OSeC9UMrdlQSZI1vUnkzhU'; // Replace with your actual API key

export const recognizeImage = async (imageUrl) => {
  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl,
              },
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5,
              },
            ],
          },
        ],
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error recognizing image:', error);
    throw error;
  }
};
