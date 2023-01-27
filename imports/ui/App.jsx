import React from 'react';
import { MovieSearch } from './MovieSearch.jsx';
import { Nominated } from './Nominated.jsx';

export const App = () => (
  <div>
    <h1 align="center">Shoppies 2021</h1>
    <div className="appContainer">
      <MovieSearch/>
      <Nominated/>
    </div>
  </div>
);
