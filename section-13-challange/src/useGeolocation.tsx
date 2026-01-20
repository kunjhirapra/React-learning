import {useState} from "react";

interface Position {
  lat: number | null;
  lng: number | null;
}
export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>({
    lat: null,
    lng: null,
  });
  const [error, setError] = useState<string | null>(null);
  const getPosition = () => {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };
  return {isLoading, position, error, getPosition} as const;
}
