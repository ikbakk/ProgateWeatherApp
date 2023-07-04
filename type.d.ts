export interface GeocodingType {
  lat: number;
  lon: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CustomWeatherType {
  weather: Weather[];
  main: Main;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}
