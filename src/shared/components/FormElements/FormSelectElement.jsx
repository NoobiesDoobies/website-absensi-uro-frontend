import React from "react";

import "./Form.css";

const FormSelectElement = ({
  name,
  label,
  register,
  isRequired,
  optionList,
  multiple = false,
  isEditingMode = true,
  defaultValue = "",
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select
        name={name}
        className="form-control overflow-auto"
        {...register(name, { required: true })}
      >
        <option value="">...</option>
        {optionList.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectElement;
