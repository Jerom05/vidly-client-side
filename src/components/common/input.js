import React from "react";
const Input = ({ type, label, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default Input;
