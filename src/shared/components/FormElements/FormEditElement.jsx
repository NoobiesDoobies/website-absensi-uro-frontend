import React from "react";

const FormEditElement = ({
  label,
  type,
  name,
  placeholder,
  register,
  isEditingMode = true,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {isEditingMode ? (
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          {...register(name, { required: true })}
          required
        />
      ) : (
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          {...register(name, { required: true })}
          required
          disabled
        />
      )}
    </div>
  );
};

export default FormEditElement;
