import React, { useContext, useEffect, useState } from "react";
import Notes from "./Notes";
import noteContext from "../Context/notes/noteContext";
import Spinner from "./Spinner";

export default function Usernotes(props) {
  const Context = useContext(noteContext);
  const { mode } = Context;

  const { setProgress } = props;
   const [showSpinner, setSpinner] = useState(false);

     useEffect(() => {
       setSpinner(true);
       setTimeout(() => {
         setSpinner(false);
       }, 1000);
     }, [])

  return (
    <div style={{ marginTop: "17dvh", marginBottom: "25dvh" }}>
      {showSpinner ? ( <Spinner /> ) : (
      <div className={`bg-${mode} p-4 rounded shadow-sm w-100`}>
        <Notes setProgress={setProgress} />
      </div>
     )}
    </div>
  );
}
