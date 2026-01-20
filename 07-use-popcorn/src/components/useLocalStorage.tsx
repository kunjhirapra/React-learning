import {useEffect, useState} from "react";
import type {WatchedMovies} from "../App";
export function useLocalStorage({
  initialState,
  key,
}: {
  initialState: WatchedMovies[];
  key: string;
}) {
  const [value, setvalue] = useState<WatchedMovies[]>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setvalue] as const;
}
