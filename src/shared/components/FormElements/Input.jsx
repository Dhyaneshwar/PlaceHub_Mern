import React from "react";

import "./Input.css";

const Input = (props) => {
  const elemt =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      {elemt}
    </div>
  );
};

export default Input;
