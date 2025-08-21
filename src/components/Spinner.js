import React, { useContext } from 'react'
import spinner from './Spinnner.gif'
import noteContext from "../Context/notes/noteContext";

export default function Spinner() {

    const Context = useContext(noteContext);
  const { mode } = Context;

  return (
    <div>
      <div className="text-center" style={{
        margin: '30%'
      }}>
        <img src={spinner} alt="loading" />
        <p><i>Loading .......</i></p>
      </div>
    </div>
  )
}
