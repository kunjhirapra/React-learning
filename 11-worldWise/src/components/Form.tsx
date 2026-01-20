// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// "https://us1.locationiq.com/v1/reverse" // second-option
// https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=046824b995514a50a77ead129d06046a

import {useEffect, useState, type FormEvent} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useUrlPosition} from "../hooks/useUrlPosition.ts";

import BackButton from "./BackButton.tsx";
import Button from "./Button.tsx";
import styles from "./Form.module.css";
import Message from "./Message.tsx";
import Spinner from "./Spinner.tsx";
import {useCities} from "../contexts/CitiesContext.tsx";
import type {NewCityState} from "../type.tsx";
import {useNavigate} from "react-router-dom";

function Form() {
  const {createCity} = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const {lat, lng} = useUrlPosition();
  const API_KEY = "046824b995514a50a77ead129d06046a";
  const BaseUrl = "https://api.geoapify.com/v1/geocode/reverse";
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BaseUrl}?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`
          );
          const rawData = await res.json();
          const data = rawData.features[0].properties;
          console.log(data);
          if (!data.country_code)
            throw new Error(
              "That does't seem to be a city. Click somewhere else 😑."
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.country);
          setEmoji(data.country_code);
        } catch (error) {
          setGeoCodingError((error as Error).message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newCity: NewCityState = {
      cityName,
      country,
      emoji,
      date: date || new Date(),
      notes,
      position: {
        lat: lat ? parseFloat(lat) : 0,
        lng: lng ? parseFloat(lng) : 0,
      },
      id: crypto.randomUUID(),
    };
    await createCity(newCity);
    navigate(`/app`);
  }

  if (geoCodingError) return <Message message={geoCodingError} />;
  if (!lat && !lng) return <Message message="Start by clicking on the Map." />;
  if (isLoadingGeoCoding) return <Spinner />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {
            <img
              src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
              alt="flag"
            />
          }
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(new Date(e.target.value))
          }
          value={date.toISOString().slice(0, 10)}
        /> */}
        <DatePicker
          selected={date}
          id="date"
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#000000"
              viewBox="0 0 256 256">
              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path>
            </svg>
          }
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
