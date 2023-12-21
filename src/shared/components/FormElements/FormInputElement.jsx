const FormInputElement = ({
  register,
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  withLabel = true,
  className,
  error,
}) => {
  return (
    <div className={className}>
      {withLabel && <label className="">{label}</label>}
      <input
        className="w-full h-10 px-2 border-2 border-gray-600 rounded-md outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: error ? error : true })}
        required
      />
    </div>
  );
};

export default FormInputElement;
