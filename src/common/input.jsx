import React from "react";

// const Input = ({ name, label, value, type, error, onChange }) => {
const Input = ({ name, label, error, ...rest }) => {
  //rest operator=> if you add new attrebute to the input
  // no need to add it here, it will be part of rest
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        // name={name}
        // value={value}
        // onChange={onChange}
        // type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
