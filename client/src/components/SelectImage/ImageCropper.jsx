import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import Button from "./Button";
import './styles/imageCropper.css'

import "react-image-crop/dist/ReactCrop.css";

const Cropper = (props) => {

  const { src, onSave, onCancel, outputSize, className, uploadImage} = props;

  let fileUrl;

  // state
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1, unit: "px" });

  // get a centered, square selection padded out 10px from the edge
  const getDefaultSelection = (w, h) => {
    const pad = 10;
    const pad2 = pad * 2;
    let x = pad;
    let y = pad;
    let width = w - pad2;
    let height = h - pad2;

    if (w === h) {
      // nothing
    } else if (w > h) {
      width = height;
      x = (w - width) >> 1;
    } else {
      height = width;
      y = (h - w) >> 1;
    }

    const metrics = { x, y, width, height };
    return metrics;
  };

  // returns an image URL (?)
  const makeClientCrop = async crop => {
    if (image && crop.width && crop.height) {
      return await getCroppedImg(image, crop, "cropped.jpg");
    }
  };

  // creates a cropped image using provided metrics
  const getCroppedImg = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      outputSize,
      outputSize
    );

    return new Promise((resolve, reject) => {
     
      console.log(resolve)

      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
        uploadImage(blob)
      }, "image/jpeg");
    });
  };




  const onImageLoaded = image => {
    debugger;
    console.log("onImageLoaded", image.width, image.height);
    setImage(image);
    const { width, height } = image;
    const metrics = getDefaultSelection(width, height);
    setCrop(state => ({ ...state, ...metrics }));
    return false;
  };

  const onCropChange = data => setCrop(data);

  const onSaveClick = async () => {
    const croppedImageUrl = await makeClientCrop(crop);
    // console.log('crop', crop)
    // uploadImage(crop)
    // console.log('cropped', croppedImageUrl)

    onSave(croppedImageUrl);
  };

  return (
    <div>
      <ReactCrop
        src={src}
        crop={crop}
        keepSelection={true}
        maxWidth={150}
        maxHeight={150}
        onChange={onCropChange}
        onImageLoaded={onImageLoaded}
        id='cropper'
        style={{ justifyContent:'center', alignItems:'center', height:'150px', width:'150px'}}

      />
      {image && (
        <Fragment>
          <Button onClick={onSaveClick} css={{ display: "block" }} > 
            Use this Image
          </Button>
          <Button onClick={e => console.log(fileUrl)}>Test</Button>
          {/* <button
            type="button"
            onClick={onCancel}
            style={{ marginTop: "0.5rem" }}
          >
            Choose another photo
          </button> */}
        </Fragment>
      )}
      {/* <pre style={{ font: "9px/1 monospace" }}>
        {JSON.stringify(crop, null, 2)}
      </pre> */}
    </div>
  );
};

// adds a grid
const ImageCropper = styled(Cropper)(props => {
  const grid1d =
    "transparent, transparent 33%, rgba(255,255,255,0.66) calc(33% + 2px)";
  const grid = [
    `repeating-linear-gradient(${grid1d})`,
    `repeating-linear-gradient(90deg, ${grid1d})`
  ];
  return {
    display: "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
    ".ReactCrop": {
      marginBottom: "1rem"
    },
    ".ReactCrop__crop-selection": {
      borderImage: "none",
      border: "solid 2px white",
      background: grid.join()
    }
  };
});

ImageCropper.propTypes = {
  src: PropTypes.string.isRequired,
  outputSize: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

ImageCropper.defaultProps = {
  outputSize: 5000
};

export default ImageCropper;
