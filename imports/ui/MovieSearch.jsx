import React from 'react';
import { HTTP } from 'meteor/http'
import { Movie } from './Movie.jsx';
import { ButtonNominate } from './ButtonNominate.jsx';
import { getNominated } from '../api/nominations.js';


export class MovieSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      collection: [{"Title": "Start searching!", "imdbID": "1"}],
      noResultsFlag: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  search(term) {
    this.setState((state) => {
      return ({search: term})
    });
    HTTP.get("http://www.omdbapi.com/?", {params: {s: term, apikey: 'ebc62027'}}, (error, result) => {
      if (!error){
        if(result.data.Search){
          this.setState((state) => {
            return ({collection: result.data.Search})
          });
          this.setState((state) => {
            return({noResultsFlag: false})
          })
        } else {
          this.setState((state) => {
            return ({noResultsFlag: true})
          });
        }
      }
    });
  }

  handleChange(event){
    var value = event.target.value
    this.search(value);
  }

  render(){
    var elements = null
    if(this.state.noResultsFlag){
      elements = (
        <div className="noResults">
          <p>No results found!</p>
        </div>
      )
    } else {
      elements = this.state.collection.map((movie) =>
        <div className="movie">
          <Movie data={movie} key={movie.imdbID} className="movie"/>
          <ButtonNominate buttonData={movie}/>
        </div>
      );
    }
    return(
      <div className="searchItem">
        <div className="searchContainer">
          <div className="searchBarContainer">
            <img src="https://www.freeiconspng.com/uploads/search-icon-png-21.png" width="50" height="50"/>
            <input type="text" value={ this.state.search } onChange={ this.handleChange } className="searchBar"/>
          </div>
          { elements }
        </div>
      </div>
    );
  }
}
