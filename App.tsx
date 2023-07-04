import { StatusBar } from 'expo-status-bar';
import { AppRegistry, View } from 'react-native';
import { ThemeProvider, Text } from 'react-native-magnus';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Searchbar from './src/components/Searchbar';
import WeatherInfo from './src/components/WeatherInfo';
import SearchProvider from './src/context/SearchContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']}>
        <ThemeProvider>
          <SearchProvider>
            <View className='h-screen flex items-center py-16 px-10'>
              <StatusBar translucent />
              <Searchbar />
              <WeatherInfo />
            </View>
          </SearchProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent('App', () => App);
