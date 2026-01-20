import {Link} from "react-router-dom";
import styles from "./CityItem.module.css";
import type {CityState} from "../type";
import {useCities} from "../contexts/CitiesContext";

const formatDate = (date: Date | null) => {
  if (!date) return "Unknown date";
  const validDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(validDate);
};

export const flagemojiToPNG = (emoji: string) => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
      alt="flag"
    />
  );
};

function CityItem({city}: {city: CityState}) {
  const {currentCity, handleRemoval} = useCities();
  return (
    <li>
      <Link
        to={`${city.id}?lng=${city.position.lng}&lat=${city.position.lat}`}
        className={`${styles.cityItem} ${
          currentCity?.id === city.id ? styles["cityItem--active"] : ""
        }`}>
        <span className={styles.emoji}>{flagemojiToPNG(city.emoji)}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>({formatDate(city.date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            handleRemoval(city.id);
          }}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
