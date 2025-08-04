import React from "react";
import Notes from "./Notes";

export default function Notescomp(props) {
  const { setProgress } = props;

  return (
    <div>
      <Notes setProgress={setProgress} />
    </div>
  );
}
