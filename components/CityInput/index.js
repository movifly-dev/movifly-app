/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import getAirportsWithIata from '../../utils/getAirportsWithIata';
import { color } from 'react-native-reanimated';

const CityInput = ({ label, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleCitySelect = (selectedValue) => {
    onChange(selectedValue);
  };

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const filteredAirports = await getAirportsWithIata(searchTerm);

        if (filteredAirports.length === 1) {
          handleCitySelect(`${filteredAirports[0].name} - ${filteredAirports[0].iata_code}`);
        }

        setSuggestions(filteredAirports);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      throw new Error('Error searching airports::' + error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        placeholder={
          label.toLowerCase() === 'destino'
            ? `Digite o ${label.toLowerCase()}`
            : `Digite a ${label.toLowerCase()}`
        }
        onChangeText={(text) => setSearchTerm(text.toUpperCase())}
      />
      <Button title={`Buscar ${label}`} onPress={handleSearch} disabled={!searchTerm} marginTop={0} />
      <View style={styles.pickerContainer}>
        {suggestions.length > 1 ? (
          <Picker
            style={styles.picker}
            selectedValue={value}
            onValueChange={(itemValue) => handleCitySelect(itemValue)}
          >
            {suggestions.map((item) => (
              <Picker.Item
                key={item.iata_code}
                label={`${item.name} - ${item.iata_code}`}
                value={`${item.name} - ${item.iata_code}`}
              />
            ))}
          </Picker>
        ) : suggestions.length === 1 || value.length > 0 ?
          <Text style={{paddingVertical: 10, textAlign: 'center'}}>
            {value}
          </Text>
          :  (
            <Picker enabled={false} style={styles.hidden} />
          )}
      </View>
    </View>
  );
};


const styles = {
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10
  },
  picker: {
    width: '100%',
    paddingHorizontal: 10,
  },
};


export default CityInput;