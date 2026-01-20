import {useState, useEffect, useRef} from "react";
import {APIKEY, Loader} from "../App";
import StarRating from "./StarRating";
import {useEventListener} from "./useEventListener";

interface MovieDataType {
  imdbID: string;
  Year: string;
  Title: string;
  Poster: string;
  Released: string;
  Genre: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Actors: string;
  Director: string;
}
interface WatchedMovies {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
  countTotalRating: React.RefObject<number>;
}
export function SelectedMovie({
  selectedMovie,
  removeMovie,
  watchedMovies,
  onAddWatched,
}: {
  selectedMovie: string;
  removeMovie: () => void;
  watchedMovies: WatchedMovies[];
  onAddWatched: (movie: WatchedMovies) => void;
}) {
  const [movie, setMovie] = useState<Partial<MovieDataType>>({});
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [movieRating, SetMovieRating] = useState(0);

  const countRatingTimes = useRef(0);

  useEffect(
    function () {
      if (movieRating) countRatingTimes.current++;
      console.log(countRatingTimes.current);
    },
    [movieRating]
  );
  useEventListener({action: removeMovie, key: "Escape"});
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsMovieLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedMovie}`
        );
        const data = await res.json();
        setMovie(data);
        setIsMovieLoading(false);
      }
      getMovieDetails();
    },
    [selectedMovie]
  );
  function handleClick() {
    const existingMovie = watchedMovies.find(
      (movie) => movie.imdbID === selectedMovie
    );
    const newMovie: WatchedMovies = {
      imdbID: selectedMovie,
      Title: movie.Title!,
      Year: movie.Year!,
      Poster: movie.Poster!,
      runtime: Number(movie.Runtime?.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating!),
      userRating: Number(movieRating),
      countTotalRating: countRatingTimes,
    };

    if (existingMovie) {
      if (existingMovie.userRating !== newMovie.userRating) {
        onAddWatched(newMovie);
      }
    } else {
      onAddWatched(newMovie);
    }
    removeMovie();
  }

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `MOVIE: ${movie?.Title}`;

      return function () {
        document.title = "07-use-popcorn";
      };
    },
    [movie]
  );

  return isMovieLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <button className="btn-back" onClick={removeMovie}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#000000"
          viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
        </svg>{" "}
      </button>
      <header>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} <span> &bull; {movie.Runtime}</span>
          </p>
          <p>{movie.Genre}</p>
          <p>
            ⭐ <strong>{movie.imdbRating}</strong> IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            defaultRating={
              watchedMovies.find((curr) => curr.imdbID === movie.imdbID)
                ?.userRating ?? 0
            }
            onSetRating={SetMovieRating}
          />
          {movieRating > 0 && (
            <button className="btn-add" onClick={handleClick}>
              + Add To List
            </button>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring: {movie.Actors}</p>
        <p>Directed by: {movie.Director}</p>
      </section>
    </div>
  );
}
