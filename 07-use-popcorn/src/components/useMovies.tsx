import {useEffect, useState} from "react";
import type {Movie} from "../App";
import {APIKEY} from "../App";

export function useMovies({
  query,
  handleSelectRemove,
}: {
  query: string;
  handleSelectRemove: () => void;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(
    function () {
      const controller = new AbortController();
      handleSelectRemove?.();
      if (query.length < 3) {
        setMovies([]);
        setError("Type at least 3 letters to search for a movie");
        return;
      }
      const timeoutId = setTimeout(async () => {
        try {
          setIsLoading(true);
          setError(null);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            {signal: controller.signal}
          );

          if (!res.ok) throw new Error("Something Went Wrong!! Try again!!");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
        } catch (err) {
          setMovies([]);
          const error = err as Error;
          if (error.name !== "AbortError") setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }, 500);
      return () => {
        clearTimeout(timeoutId);
        controller.abort();
      };
    },
    [query]
  );
  return {movies, error, isLoading};
}
