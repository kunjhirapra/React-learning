import {Movie} from "./Movie";

interface MovieType {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: MovieType[];
  setSelectMovie: (id: string) => void;
}

export function MovieList({movies, setSelectMovie}: MovieListProps) {
  return (
    <div className="box">
      <ul className="list list-movies">
        {movies.map((movie) => (
          <Movie
            key={movie.imdbID}
            {...movie}
            onClick={() => setSelectMovie(movie.imdbID)}
          />
        ))}
      </ul>
    </div>
  );
}
