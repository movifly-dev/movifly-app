/* eslint-disable react/prop-types */
// CityInput.js

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import searchCitiesByKeyword from '../../utils/searchCitiesByKeyword';
import { useMain } from '../../contexts/MainContext';

const CityInput = ({ label, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const { accessToken } = useMain();


  const handleInputChange = async (text) => {
    onChange(text); // Update the input field value
    const cities = await searchCitiesByKeyword(text, 10, accessToken); // Perform city search
    setSuggestions(cities); // Update the suggestions
  };

  const handleCitySelect = (city) => {
    onChange(city.name); // Update the input field with the selected city
    setSuggestions([]); // Clear suggestions
  };

  return (
    <View>
      <Text>{label}:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
        onChangeText={handleInputChange}
        value={value}
        placeholder={label.toLowerCase() === 'destino' ? `Digite o ${label.toLowerCase()}` : `Digite a ${label.toLowerCase()}`}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCitySelect(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default CityInput;
