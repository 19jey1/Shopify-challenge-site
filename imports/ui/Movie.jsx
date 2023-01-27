import React from 'react';
import { HTTP } from 'meteor/http';

export class Movie extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      Title: this.props.data.Title,
      Year: this.props.data.Year,
      Poster: this.props.data.Poster,
      Released: "",
      Director: "",
      Plot: "",
    };
  };

  fallback(event){
    event.target.src = 'https://image.flaticon.com/icons/png/512/130/130877.png';
  };

  getDetails(){
    HTTP.get("http://www.omdbapi.com/?", {params: {i: this.props.data.imdbID, apikey: 'ebc62027'}}, (error, result) => {
      if(!error){
        this.setState((state) => {
          return(
            {Title: result.data.Title,
            Year: result.data.Year,
            Poster: result.data.Poster,
            Released: result.data.Released,
            Director: result.data.Director,
            Plot: result.data.Plot}
          )
        });
      }
    });
  }

  render(){
    this.getDetails(this.props.data.imdbID);
    return(
    <div className="movieInternal">
      <h3 align="center" className="movieInternalTitle">{ this.props.data.Title + " (" + this.props.data.Year + ")"}</h3>
      <div>
        <p className="movieInternalYear">{ "Released " + this.state.Released }</p>
        <p>{ "Directed by: " + this.state.Director }</p>
        <p>{ this.state.Plot }</p>
      </div>
      <img src={ this.props.data.Poster } height="150" width="150" className="movieInternalImage" onError={this.fallback}/>
    </div>
    );
  }
}
