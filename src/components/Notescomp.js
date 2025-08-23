import React, { useEffect, useState } from "react";
import Notes from "./Notes";
import Spinner from "./Spinner";

export default function Notescomp(props) {
  
  const { setProgress } = props;
  const [showSpinner, setSpinner] = useState(false);

    useEffect(() => {
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
      }, 1000);
    }, [])

  return (
    <div>
      {showSpinner ? ( <Spinner /> ) : (
      <Notes setProgress={setProgress} />
      )}
    </div>
  );
}
