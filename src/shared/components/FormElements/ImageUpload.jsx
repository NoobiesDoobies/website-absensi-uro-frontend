import React from "react";

import "./ImageUpload.css";

const ImageUpload = ({ register, name }) => {
  return (
    <>
      <div className="form-group">
        <div className="form-control">
          <input type="file" name={name} {...register(name)} />
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
