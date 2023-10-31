import React from "react";
import {Controller} from "react-hook-form";

import "./Form.css";

const FormSelectElement = ({
  name,
  label,
  control,
  isRequired,
  optionList,
  multiple = false,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: { isRequired } }}
        render={({ field }) => (
          <select className="form-control overflow-auto" {...field} required>
            <option value="">...</option>
            {optionList.map((opt) => {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            })}
          </select>
        )}
      />
    </div>
  );
};

export default FormSelectElement;
