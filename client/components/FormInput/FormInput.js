const FormInput = ({ handleFormChange, label, errAttr, ...otherProps }) => (
  <div className='group'>
    <input
      className={`form-input ${errAttr ? "is-invalid" : ""}`}
      onChange={handleFormChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value?.length ? "shrink" : ""
        } form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);
export default FormInput;
