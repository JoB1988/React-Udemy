import React from "react";

function Toast({ title, message }) {
  return title ? (
      <div className="alert alert-dismissible alert-success">
        <button type="button" className="close" data-dismiss="alert">
          &times;
        </button>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
  ) : (
    <></>
  );
}

export default Toast;
