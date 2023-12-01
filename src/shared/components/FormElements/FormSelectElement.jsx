import React from "react";

const FormSelectElement = ({
  name,
  label,
  register,
  isRequired,
  optionList,
  multiple = false,
  isEditingMode = true,
  defaultValue = "",
  withLabel = true,
  className,
  placeHolder = "Select",
}) => {
  return (
    <div className={className}>
      {withLabel && <label>{label}</label>}

      <select
        name={name}
        className="h-10 w-full px-2"
        {...register(name, { required: true })}
      >
        <option value="">{placeHolder}</option>
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
