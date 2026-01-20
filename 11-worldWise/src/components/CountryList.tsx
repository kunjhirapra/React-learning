import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import {useCities} from "../contexts/CitiesContext";
import type {CityState, CityContextType} from "../type";

function CountryList() {
  const {cities, isLoading}: CityContextType = useCities();
  const Countries = cities.reduce((acc: CityState[], current) => {
    if (!acc.find((city) => city.country === current.country)) {
      return [...acc, current];
    }
    return acc;
  }, []);
  if (isLoading) return <Spinner />;
  if (!Countries.length)
    return (
      <Message message="Add your First city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {Countries.map((city) => (
        <CountryItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
export default CountryList;
