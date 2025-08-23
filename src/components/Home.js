import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import Spinner from "./Spinner";

export default function Home(props) {
  const { setProgress } = props;

  const [showSpinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }, [])

  return (
    <>
    { showSpinner ? ( <Spinner /> ) : (
    <div>
      <Homepage setProgress={setProgress} />
    </div>
    )}
    </>
  );
}
