import {useRef} from "react";
import {useEventListener} from "./useEventListener";

export function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputField = useRef<HTMLInputElement>(null);
  useEventListener({
    key: "Enter",
    action: function () {
      if (document.activeElement === inputField.current) return;

      inputField.current!.focus();
      setQuery("");
    },
  });
  // useEffect(
  //   function () {
  //     function callback(e: KeyboardEvent) {
  //       if (document.activeElement === inputField.current) return;
  //       if (e.key === "Enter") {
  //         inputField.current!.focus();
  //         setQuery("");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //   },
  //   [setQuery]
  // );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      // onFocus={(e) => e.target.select()}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputField}
    />
  );
}

export function Navbar({children}: {children: React.ReactNode}) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
interface MovieProps {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
}
export function NumResults({movies}: MovieProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length || 0}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
