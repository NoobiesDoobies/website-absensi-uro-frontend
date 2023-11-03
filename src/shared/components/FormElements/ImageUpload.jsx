import React from "react";

import "./Form.css"
import "./ImageUpload.css";

const ImageUpload = ({ register, name, label }) => {
  return (
    <>
      <div className="form-group">
        <label >{label}</label>
        <div className="form-control form-control-file-input">
          <input
            className="file-input"
            type="file"
            name={name}
            {...register(name)}
          />
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
