import {useState} from "react";
import {Navbar, Search, NumResults} from "./components/Navbar";
import {Main} from "./components/Main";
import {MovieList} from "./components/MovieList";
import {WatchedMoviesList} from "./components/WatchedMoviesList";
import {WatchedSummary} from "./components/WatchedSummary";
import {SelectedMovie} from "./components/SelectedMovie";
import {useMovies} from "./components/useMovies";
import {useLocalStorage} from "./components/useLocalStorage";

function Box({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

export const APIKEY = "78fc7e1a";
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
export interface WatchedMovies extends Movie {
  runtime: number;
  imdbRating: number;
  userRating: number;
  countTotalRating: React.RefObject<number>;
}

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [isSelected, setIsSelected] = useState<string | null>("");
  // const [watched, setWatched] = useState<WatchedMovies[]>([]);

  const {movies, error, isLoading} = useMovies({query, handleSelectRemove});
  const [watched, setWatched] = useLocalStorage({
    initialState: [],
    key: "watched",
  });

  function handleSelect(id: string) {
    setIsSelected((selectedId) => (id === selectedId ? null : id));
    // const selectedMovie = movies.find((currMovie) => currMovie.imdbID === id);
    // document.title = `MOVIE: ${selectedMovie?.Title}`;
  }
  function handleSelectRemove() {
    setIsSelected(null);
    // document.title = "07-use-popcorn";
  }

  function handleAddWatchedMovie(movie: WatchedMovies) {
    const existingMovie = watched.find(
      (currMovie) => currMovie.imdbID === movie.imdbID
    );

    if (existingMovie) {
      if (existingMovie.userRating !== movie.userRating) {
        setWatched((watched) =>
          watched.map((currMovie) =>
            currMovie.imdbID === movie.imdbID ? movie : currMovie
          )
        );
      }
    } else {
      setWatched((watched) => [...watched, movie]);
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    }
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) =>
      watched.filter((currMovie) => currMovie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ShowError
              message={error}
              symbol={query.length < 3 ? "🔍" : "❌"}
            />
          ) : (
            <MovieList movies={movies} setSelectMovie={handleSelect} />
          )}{" "}
        </Box>
        <Box>
          {isSelected ? (
            <SelectedMovie
              selectedMovie={isSelected}
              removeMovie={handleSelectRemove}
              watchedMovies={watched}
              onAddWatched={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
export function Loader() {
  return <p className="loader">Loading...</p>;
}
function ShowError({message, symbol}: {message: string; symbol: string}) {
  return (
    <p className="error">
      <span>{symbol}</span> {message}
    </p>
  );
}
