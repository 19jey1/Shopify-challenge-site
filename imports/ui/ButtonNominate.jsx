import React, { useState } from 'react';
import { Nominations, getNominated } from "../api/nominations.js";

function fixNom(movie){
  ret = movie
  delete ret._id;
  return ret;
}

export const ButtonNominate = ({ buttonData }) => {
  nominations = getNominated();
  nominations = nominations.map((movie) => fixNom(movie));

  function insertMovie(movie){
    var flag = false; //this solution sucks so much
    if (nominations.length == 5){
      console.log("Nomination forbidden: You have too many!") //delete this eventually / replace with a better warning message
      flag = true;
    }
    nominations.forEach((movie) => {
      if(movie.imdbID === buttonData.imdbID){
        console.log("Nomination forbidden: This movie is already nominated!") //same for this one
        flag = true;
      }
    });
    if(!flag){ //bad solution
      Nominations.insert({movie});
    }
  }

  function handleClick(event){
    event.preventDefault();
      insertMovie({
        Poster: buttonData.Poster,
        Title: buttonData.Title,
        Type: buttonData.Type,
        Year: buttonData.Year,
        imdbID: buttonData.imdbID
      });
  }
  return(
    <button align="right" className="movieInternalButton" onClick={handleClick}> Nominate </button>
  );
}
