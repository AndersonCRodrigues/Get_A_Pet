import React from 'react';
import './RoundedImage.css';

function RoundedImage({src, alt, width}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded_image ${width}`}/>
  )
}

export default RoundedImage