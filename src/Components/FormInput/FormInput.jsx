function FormInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) {
  return (
    <div className="mb-3">
      {/* Dynamically generate label from ID */}
      <label className="mb-2 fw-bold" htmlFor={id}>
        {`${id.charAt(0).toUpperCase() + id.slice(1)}:`}
      </label>

      {/* Render textarea if type is "textarea", otherwise render input */}
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-control"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form-control py-2"
        />
      )}

      {/* Show error message if the field is touched and has an error */}
      {error && touched && <div className="text-danger pt-1">{error}</div>}
    </div>
  );
}

export default FormInput;
