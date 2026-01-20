interface WatchedSummaryProps {
  watched: {
    runtime: number;
    imdbRating: number;
    userRating: number;
  }[];
}
const average = (arr: number[]): number =>
  arr.reduce((acc: number, cur: number) => acc + cur / arr.length, 0);

export function WatchedSummary({watched}: WatchedSummaryProps) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const totalRuntime = watched.reduce((acc, movie) => acc + movie.runtime, 0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>
            <span>{watched.length}</span>
            <span className="no-wrap"> movies</span>
          </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            <span>{totalRuntime}</span>
            <span className="no-wrap"> total min</span>
          </span>
        </p>
      </div>
    </div>
  );
}
