import type {CityState} from "../type";
import {flagemojiToPNG} from "./CityItem";
import styles from "./CountryItem.module.css";

function CountryItem({city}: {city: CityState}) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{flagemojiToPNG(city.emoji)}</span>
      <span>{city.country}</span>
    </li>
  );
}

export default CountryItem;
