import { Mongo } from 'meteor/mongo';
import { useTracker } from 'meteor/react-meteor-data';

function formatMovie(movie){
  var ret = movie.movie
  ret._id = movie._id
  return (ret)
}
const Nominations = new Mongo.Collection('movies');

function getNominated(){
  var nominations = useTracker(() => Nominations.find({}).fetch());
  nominations = nominations.map((movie) => formatMovie(movie));
  return nominations
}

export {Nominations, getNominated};
