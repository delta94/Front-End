import React, { useState } from 'react';
import ImageCapture from './ImageCapture.js';
import axios from 'axios';

const PhotoUpload = props => {
  const [medImage, setMedImage] = useState(null);

  const [displayCamera, toggleDisplayCamera] = useState(false);

  const photoSelect = event => {
    setMedImage(event.target.files[0]);
  };

  const toggleCamera = () => {
    toggleDisplayCamera(!displayCamera);
  };

  const photoEndpoint = process.env.REACT_APP_IMAGE_STORE;
  const analysisEndpoint = process.env.REACT_APP_DS_ANALYZE;

  const photoUpload = () => {
    const imgData = new FormData();
    imgData.append('image', medImage, medImage.name);
    axios.put(`${photoEndpoint}/${medImage.name}`, imgData)
      .then(data => 
        axios.post(analysisEndpoint, {
          bucket: photoEndpoint,
          filename: medImage.name
        }))
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <>
      <input
        type='file'
        accepts='image/*'
        onChange={photoSelect}
      />
      <button onClick={photoUpload}>Upload Picture?</button>
      <button onClick={toggleCamera}>take photo</button>
      {displayCamera ? <ImageCapture /> : null}
    </>
  );
};

export default PhotoUpload;
