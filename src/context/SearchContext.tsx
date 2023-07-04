import axios from 'axios';
import { API_KEY } from '@env';
import { CustomWeatherType, GeocodingType } from '../../type';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface ContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  geocoding: GeocodingType;
  weather: CustomWeatherType;
  isCityError: boolean;
  isWeatherError: boolean;
}

export const SearchContext = createContext<ContextType>({} as ContextType);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<string>('Mataram');
  const [geocoding, setGeocoding] = useState<GeocodingType>(
    {} as GeocodingType
  );
  const [weather, setWeather] = useState<CustomWeatherType>(
    {} as CustomWeatherType
  );
  const [isCityError, setIsCityError] = useState<boolean>(false);
  const [isWeatherError, setIsWeatherError] = useState<boolean>(false);

  useEffect(() => {
    const searchCity = async (city: string) => {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

      try {
        const res = await axios.get(url);
        const { lat, lon } = res.data[0];
        setGeocoding({ lat: lat || 0, lon: lon || 0 });
      } catch (error) {
        setIsCityError(true);
      }
    };

    if (city !== '') {
      searchCity(city);
    }
  }, [city]);

  useEffect(() => {
    const getWeather = async (geocoding: GeocodingType) => {
      const { lat, lon } = geocoding;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      try {
        const res = await axios.get(url);
        const { weather, main, visibility, wind } = res.data;

        setWeather({
          weather,
          main,
          visibility,
          wind
        });
      } catch (error) {
        setIsWeatherError(true);
      }
    };

    if (geocoding.lat !== 0 && geocoding.lon !== 0) {
      getWeather(geocoding);
    }
  }, [geocoding]);

  const contextValue = {
    city,
    setCity,
    geocoding,
    weather,
    isCityError,
    isWeatherError
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
