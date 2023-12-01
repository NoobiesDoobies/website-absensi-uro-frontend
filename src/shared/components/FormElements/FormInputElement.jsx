import React from "react";

const FormInputElement = ({
  register,
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  withLabel = true,
  className
}) => {
  return (
    <div className={className}>
      {withLabel && <label className="sm:">{label}</label>}
      <input
        className="h-10 w-full px-2"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: { required } })}
        required
      />
    </div>
  );
};

export default FormInputElement;
