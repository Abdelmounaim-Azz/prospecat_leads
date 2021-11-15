const CustomButton = ({children, inverted, ...otherProps}) => (
  <button
    className={`${inverted ? "inverted" : ""} custom-button`}
    {...otherProps}
    type="submit"
  >
    {children}
  </button>
);
export default CustomButton;
