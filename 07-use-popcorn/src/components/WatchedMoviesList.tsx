import {WatchedMovie} from "./WatchedMovie";

interface MyListProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export function WatchedMoviesList({
  watched,
  onDelete,
}: {
  watched: MyListProps[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="box">
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie key={movie.imdbID} {...movie} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
