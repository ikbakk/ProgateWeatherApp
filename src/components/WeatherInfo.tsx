import { useContext } from 'react';

import { View } from 'react-native';
import { Text, Image } from 'react-native-magnus';
import { SearchContext } from '../context/SearchContext';

const WeatherInfo = () => {
  const { city, weather: weatherObj } = useContext(SearchContext);
  const { main, visibility, weather, wind } = weatherObj;

  return (
    <View className='my-10 w-full flex items-center'>
      {Object.keys(weatherObj).length !== 0 ? (
        <>
          <Text my={10} fontSize='xl'>
            The weather of {city}
          </Text>
          <Text my={10} fontSize={84}>
            {main.temp.toFixed(1)} °C
          </Text>
          <Image
            h={100}
            w={100}
            source={{
              uri: `https://openweathermap.org/img/w/${weather[0].icon}.png`
            }}
          />
          <Text my={10} fontSize='2xl'>
            Visibility: {visibility / 1000} km
          </Text>
          <Text my={10} fontSize='2xl'>
            Wind Speed: {wind.speed.toFixed(1)} m/s
          </Text>
        </>
      ) : (
        <Text>Please enter a valid city name</Text>
      )}
    </View>
  );
};

export default WeatherInfo;
