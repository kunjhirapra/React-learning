import {createContext, useContext, useEffect, useReducer} from "react";
import type {CityState, CityContextType, State, CityAction} from "../type";

const BASE_URL = "http://localhost:4000";

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

function reducer(state: State, action: CityAction): State {
  switch (action.type) {
    case "loading/cities":
      return {...state, isLoading: true};
    case "cities/loaded":
      return {...state, cities: action.payload ?? [], isLoading: false};

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case "rejected":
      return {...state, isLoading: false, error: action.payload};
    default:
      throw new Error("Unkown action type.");
  }
}

const CitiesContext = createContext<CityContextType | null>(null);
function CitiesProvider({children}: {children: React.ReactNode}) {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({type: "loading/cities"});
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({type: "cities/loaded", payload: data} as const);
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    if (id === currentCity?.id) return;
    dispatch({type: "loading/cities"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error(`City with id ${id} not found`);
      }
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data});
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }
  async function createCity(newCity: CityState) {
    dispatch({type: "loading/cities"});

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data});
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error Creating the city...",
      });
    }
  }
  async function handleRemoval(id: string) {
    dispatch({type: "loading/cities"});

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({type: "city/deleted", payload: id});
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        handleRemoval,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export {CitiesProvider, useCities};
