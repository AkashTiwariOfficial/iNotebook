import React, { useContext } from "react";
import Notes from "./Notes";
import noteContext from "../Context/notes/noteContext";

export default function Usernotes(props) {
  const Context = useContext(noteContext);
  const { mode } = Context;

  const { setProgress } = props;

  return (
    <div style={{ marginTop: "17dvh", marginBottom: "25dvh" }}>
      <div className={`bg-${mode} p-4 rounded shadow-sm w-100`}>
        <Notes setProgress={setProgress} />
      </div>
    </div>
  );
}
