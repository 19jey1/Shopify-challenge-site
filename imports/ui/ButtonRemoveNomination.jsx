import React from 'react';
import { Nominations } from "../api/nominations.js";

export const ButtonRemoveNomination = ({ buttonData }) => {
  function handleClick(event) {
    event.preventDefault();
    Nominations.remove(buttonData._id)
  }
  return(
    <button onClick={handleClick} key={"button"+buttonData.imdbID } className="movieInternalButton"> Remove </button>
  )
}
