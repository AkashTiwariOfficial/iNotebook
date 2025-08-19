import React from 'react'
import spinner from './Spinner@.gif'

export default function Spinner() {
  return (
    <div>
      <div className="container">
        <img src={spinner} alt="spin" />
        <p><i>Loading .......</i></p>
      </div>
    </div>
  )
}
