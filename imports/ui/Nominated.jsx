import React from 'react';
import { Movie } from './Movie.jsx';
import { getNominated } from '../api/nominations.js';
import { ButtonRemoveNomination } from './ButtonRemoveNomination.jsx'

export const Nominated = () => {
  nominations = getNominated();
  const elements = nominations.map((movie) =>
    <div className="movie">
      <Movie data={movie} key={movie.imdbID}/>
      <ButtonRemoveNomination buttonData={movie}/>
    </div>
  );
  banner = null;
  if (nominations.length == 5){
    banner = (
      <div className="nominationBanner">
        <p>Nominations complete!</p>
      </div>
    )
  }

  return(
    <div className="nominateItem">
      <div className="nominateContainer">
        { banner }
        { elements }
      </div>
    </div>
  )
};
