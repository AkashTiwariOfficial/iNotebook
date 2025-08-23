import React, { useContext } from "react";
import spinner from "./Spinnerlight.gif";
import noteContext from "../Context/notes/noteContext";
import spinner1 from "./spinnerdark.gif";

export default function Spinner() {
  const Context = useContext(noteContext);
  const { mode } = Context;

  return (
    <div>
      {mode === "light" ? (
        <div
          className="text-center"
          style={{
            margin: "30%",
          }}
        >
          <img src={spinner} alt="loading" />
          <p>
            <i>Loading .......</i>
          </p>
        </div>
      ) : (
        <div
          className="text-center"
          style={{
            margin: "30%",
          }}
        >
          <img src={spinner1} alt="loading" />
          <p>
            <i>Loading .......</i>
          </p>
        </div>
      )}
    </div>
  );
}
