interface MovieProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  onClick?: () => void;
}

export function Movie({imdbID, Title, Year, Poster, onClick}: MovieProps) {
  return (
    <li onClick={onClick} key={imdbID}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓️</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}
