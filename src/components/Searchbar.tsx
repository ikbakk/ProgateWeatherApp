import { View, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-magnus';
import { useContext, useState, useRef } from 'react';
import { SearchContext } from '../context/SearchContext';

const Searchbar = () => {
  const { setCity } = useContext(SearchContext);
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
    setInput('');
    Keyboard.dismiss();
  };

  return (
    <View className='w-full'>
      <Input
        clearTextOnFocus
        value={input}
        autoCapitalize='sentences'
        onChangeText={text => setInput(text)}
        placeholder='Search Place'
      />
      <Button onPress={() => handleSearch()} mt={10} rounded={6} w='100%'>
        Search
      </Button>
    </View>
  );
};

export default Searchbar;
