// import {useState} from "react";

interface Position {
  lat: number | null;
  lng: number | null;
}
// export function useGeolocation(
//   defaultPosition: Position = {lat: null, lng: null}
// ) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [position, setPosition] = useState<Position | null>(defaultPosition);
//   const [error, setError] = useState<string | null>(null);
//   const getPosition = () => {
//     if (!navigator.geolocation)
//       return setError("Your browser does not support geolocation");

//     setIsLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//         setIsLoading(false);
//       },
//       (error) => {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     );
//   };
//   return {isLoading, position, error, getPosition} as const;
// }
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function getPosition() {
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
        navigate(`form?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return {isLoading, position, error, getPosition};
}
