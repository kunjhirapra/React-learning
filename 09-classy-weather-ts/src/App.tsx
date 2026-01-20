import React from "react";

function getWeatherIcon(wmoCode: number): string {
  const icons = new Map<number[], string>([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  return icons.get(arr!) ?? "NOT FOUND";
}

function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}
interface LocationProps {}

interface LocationState {
  location: string | null;
  isLoading: boolean;
  displayLocation: string | null;
  weather: WeatherData;
}

class App extends React.Component<LocationProps, LocationState> {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {weathercode: []},
  };
  // async fetchWeather() {
  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({weather: {}});
    try {
      this.setState({isLoading: true});
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const {latitude, longitude, timezone, name} = geoData.results.at(0);
      this.setState({
        displayLocation: `${name}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData);
      this.setState({weather: weatherData.daily});
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      this.setState({isLoading: false});
    }
  };

  setLocation = async (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({location: e.target.value});

  componentDidMount(): void {
    this.setState({location: localStorage.getItem("location") || ""}); // correct way
    // this.state.location = localStorage.getItem("location") || "";  // incorrect way
  }

  componentDidUpdate(
    prevProps: Readonly<LocationProps>,
    prevState: Readonly<LocationState>,
    snapshot?: any
  ): void {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem("location", this.state.location);
    }
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input location={this.state.location} setInput={this.setLocation} />
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather ? (
          <Weather
            weather={this.state.weather}
            location={this.state.location}
            displayLocation={this.state.displayLocation}
          />
        ) : (
          <h2>Sorry, the search result is not found...</h2>
        )}
      </div>
    );
  }
}

export default App;

class Input extends React.Component<{
  location: string;
  setInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> {
  render() {
    const {location, setInput} = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder="Search from loaction..."
          value={location}
          onChange={setInput}
        />
      </div>
    );
  }
}

interface WeatherData {
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  time?: string[];
  weathercode?: number[];
}

interface WeatherProps {
  weather: WeatherData;
  location?: string | null;
  displayLocation: string;
}

class Weather extends React.Component<WeatherProps> {
  componentWillUnmount(): void {
    console.log(1);
  }

  render() {
    const {
      temperature_2m_max = [],
      temperature_2m_min = [],
      time = [],
      weathercode = [],
    } = this.props.weather || {};

    const dates = time;
    const max = temperature_2m_max;
    const min = temperature_2m_min;
    const codes = weathercode;

    return (
      <div>
        <h2>Weather {this.props.displayLocation}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              date={date}
              max={max[i]}
              min={min[i]}
              code={codes[i]}
              key={date}
              isToday={i == 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}
class Day extends React.Component<{
  date: string;
  max: number;
  min: number;
  code: number;
  isToday: boolean;
}> {
  render() {
    const {date, max, min, code, isToday} = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}
