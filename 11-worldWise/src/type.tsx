export interface CityContextType {
  cities: CityState[];
  isLoading: boolean;
  currentCity: CityState | null;
  error: string | null;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: CityState) => Promise<void>;
  handleRemoval: (id: string) => void;
}

export interface CityState {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
}
export interface NewCityState {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
}
export interface State {
  cities: CityState[];
  isLoading: boolean;
  currentCity: CityState | null;
  error: string | null;
}
export type CityAction =
  | {
      type: "loading/cities";
    }
  | {
      type: "cities/loaded";
      payload: CityState[];
    }
  | {
      type: "city/loaded";
      payload: CityState;
    }
  | {
      type: "city/created";
      payload: CityState;
    }
  | {
      type: "city/deleted";
      payload: string;
    }
  | {
      type: "rejected";
      payload: string;
    };

type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export interface UserInitialState {
  user: User | null;
  isAuthenticated: boolean;
}

export type LoginActionType =
  | {
      type: "login";
      payload: User | null;
    }
  | {
      type: "logout";
    };
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
