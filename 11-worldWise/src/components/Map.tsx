import {useEffect, useState} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {useNavigate} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext";
import {useGeolocation} from "../hooks/useGeolocation";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Button from "./Button";
import {flagemojiToPNG} from "./CityItem";
import styles from "./Map.module.css";
import type {CityState} from "../type";

function Map() {
  const {cities, currentCity} = useCities();
  const [currentActiveCity, setCurrentActiveCity] = useState<CityState | null>(
    currentCity
  );
  const {lat: mapLat, lng: mapLng} = useUrlPosition();
  const [position, setPosition] = useState<{lat: number; lng: number}>({
    lat: 38.72757241420325,
    lng: -9.140539169311525,
  });
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition: getGeoLocationPosition,
  } = useGeolocation();

  useEffect(() => {
    setCurrentActiveCity(currentCity);
  }, [currentCity]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setPosition({lat: Number(mapLat), lng: Number(mapLng)});
    }
  }, [mapLat, mapLng]);
  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setPosition({
        lat: geoLocationPosition.lat,
        lng: geoLocationPosition.lng,
      });
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getGeoLocationPosition}>
          {isLoadingPosition ? "Loading..." : "Use my location"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <div className={styles.popUp}>
                <span>{city.cityName}</span>
                <span>{city.notes}</span>
              </div>
            </Popup>
          </Marker>
        ))}
        {currentActiveCity && (
          <Marker position={currentActiveCity.position}>
            <Popup>
              <div className={styles.popUp}>
                <span>{currentActiveCity.cityName || "Loading..."}</span>
              </div>
            </Popup>
          </Marker>
        )}
        <ChangePosition position={position} />
        <DetectClick setCurrentActiveCity={setCurrentActiveCity} />
      </MapContainer>
    </div>
  );
}
function ChangePosition({position}: {position: {lat: number; lng: number}}) {
  const map = useMap();
  map.setView(position, 10);
  return null;
}

function DetectClick({
  setCurrentActiveCity,
}: {
  setCurrentActiveCity: (city: CityState | null) => void;
}) {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      setCurrentActiveCity({
        cityName: "save the city to see the name on the map",
        country: "",
        emoji: "📍",
        date: new Date(),
        notes: "",
        position: {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        },
        id: `temp-${Date.now()}`,
      });
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;
