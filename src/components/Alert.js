import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

export default function Alert() {
  const Context = useContext(noteContext);
  const { alert } = Context;


  const capatilize = (word) => {
    if (!word) {
      return "";
    }
    if (word === "danger" || word === "warning") {
      word = "Error";
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };



  return (

    <div
      style={{
        position: "fixed",
        top: "60px",
        width: "100%",
        height: "10px",
        padding: "0 10px",
        zIndex: 9999,
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show role="alert`}
        >
          <strong>{capatilize(alert.type)}</strong>: {alert.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>

  );
}
