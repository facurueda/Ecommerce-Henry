import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import './SelectImage.css'
import React, { Fragment, useState } from "react";
import ImageCropper from "./ImageCropper";
// ------------------
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
const FileSelectorInner = styled.div(props => {
  const border = {
    border: "dashed 2px #999999",
    borderRadius: "6px"
  };
  const box = {
    boxSizing: "border-box",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    width: 150,
    height: 150
  };
  const typo = {
    font: "14px/1.2 Inter,sans-serif"
  };
  const input = {
    boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
    font: "400 1rem/1 'Futura PT',sans-serif",
    appearance: "none",
    border: "solid purple 2px",
    borderRadius: "4px",
    display: "inline-flex",
    padding: "6px 12px"
  };
  return {
    ...border,
    ...box,
    ...typo,
    ...(props.isDragAccept && {
      borderColor: "green",
      borderStyle: "solid"
    }),
    button: { ...input }
  };
});
const FileSelector = props => {
  const { onSelect } = props;
  const onDrop = files => {
    if (!onSelect) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      onSelect(reader.result);
    });
    reader.readAsDataURL(files[0]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop
  });
  return (
    <FileSelectorInner className='fileSelector'
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      {!isDragActive && (
        <Fragment>
          <p>Drop Image or</p>
          <button type="button">Upload an Image</button>
        </Fragment>
      )}
      <input {...getInputProps()} />
    </FileSelectorInner>
  );
};
FileSelector.propTypes = {
  onSelect: PropTypes.func
};
// ------------------

function SelectImage(props) {

  const {uploadImage, currentProducts, modalAvatarViewFalse} = props;
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const onImageSelect = img => setImageSrc(img); 
  const onCropSave = url => setCroppedUrl(url);
  const onReset = () => {
    setImageSrc(null);
    setCroppedUrl(null);
  };
  const currentImages = currentProducts;
  return (
    <div style={{display:'flex', flexDirection:'row-reverse', alignItems:'center', justifyContent:'center', height: '200px'}}>    
          {!imageSrc && <FileSelector onSelect={onImageSelect} />}
          {imageSrc && !croppedUrl && (
            <ImageCropper src={imageSrc} onSave={onCropSave} onCancel={onReset} uploadImage={uploadImage} modalAvatarViewFalse={modalAvatarViewFalse}/>           
          )}
          {/* {imageSrc && croppedUrl && (      
            <Fragment style={{height:'150px'}}>
              <img
                src={croppedUrl}
                style={{ maxWidth: '150px', display: "block", marginLeft:'1rem'}}
                alt=""
              />
              <button className='buttonImage' onClick={onReset}>Change Image</button>
            </Fragment>
        )} */}
    </div>
  );
}

export default SelectImage;
