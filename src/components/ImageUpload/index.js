import React, { Fragment } from 'react';
import { useToggle } from 'utilities/useToggle';
import ImageCapture from 'components/ImageUpload/ImageCapture.js';
import ImageInput from 'components/ImageUpload/ImageInput.js';
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';

const ImageUpload = ({ photo, setPhoto, ...props }) => {
  // Hook in this component by providing it with the parts of a seState hook.
  // It will set a photo appropriately, then just write an upload handler to post it where you want it.
  const [camera, toggleCamera] = useToggle(false);
  const photoSelect = event => setPhoto(event.target.files[0]);

  return (
    <Fragment>
      {camera ? (
        <ImageCapture setPhoto={setPhoto} />
      ) : !photo ? (
        <ImageInput
          buttonText='front image of pill'
          subText='or drag and drop them here'
          photoSelect={photoSelect}
        />
      ) : (
        <img src={URL.createObjectURL(photo)} alt='preview' />
      )}
      <IconButton aria-label='Use Camera For Picture' onClick={toggleCamera}>
        <AddAPhoto />
      </IconButton>
    </Fragment>
  );
};

export default ImageUpload;
