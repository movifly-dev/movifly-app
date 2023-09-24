import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import searchFlightOffers from '../utils/searchFlightOffers';
import { Picker } from '@react-native-picker/picker';
import formatDateToString from '../utils/formatDateToString';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import QuantityInput from '../components/QuantityInput';
import timestampToISO8601 from '../utils/timestampToISO8601';
import { useMain } from '../contexts/MainContext';
import FlightOfferCard from '../components/FlightOffersResults';

const OffersSearchView = () => {
  const { accessToken } = useMain();
  const [flightOffers, setFlightOffers] = useState([]);

  const [originLocationCode, setOriginLocationCode] = useState('');
  const [destinationLocationCode, setDestinationLocationCode] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [nonStop, setNonStop] = useState(true);

  const [dataVooIdaSelected, setDataVooIdaSelected] = useState(false);
  const [dataVooVoltaSelected, setDataVooVoltaSelected] = useState(false);
  const [showDataVooIdaPicker, setShowDataVooIdaPicker] = useState(false);
  const [showDataVooVoltaPicker, setShowDataVooVoltaPicker] = useState(false);

  const handleSearch = async () => {
    try {
      const searchParams = {
        originLocationCode,
        destinationLocationCode,
        departureDate: timestampToISO8601(departureDate),
        adults,
      };

      if (children >= 1) {
        searchParams.children = children;
      }

      if (infants >= 1 ) {
        searchParams.infants = infants;
      }

      if (nonStop) {
        searchParams.nonStop = nonStop;
      }

      if (dataVooVoltaSelected) {
        searchParams.returnDate = timestampToISO8601(returnDate);
      }

      const getFlightOffers = await searchFlightOffers(searchParams, accessToken);

      setFlightOffers(getFlightOffers);
    } catch (error) {
      // if (error.response) {
      //   const responseData = error.response.data;
      //   if (responseData && responseData.errors) {
      //     const firstError = responseData.errors[0];
      //     const errorCode = firstError.code;
      //     const errorMessage = firstError.detail;
      //     console.error('Amadeus API Error Code:', errorCode);
      //     console.error('Amadeus API Error Message:', errorMessage);
      //   }
      //   console.error('Full API Response:', responseData);
      // } else {
      //   console.error('Network Error:', error.message);
      // }
      Alert.alert('Erro: Dados incorretos ou nenhum voo encontrado.');
    }
  };

  const handleDataIdaChange = (event, selectedDate) => {
    setShowDataVooIdaPicker(false);
    setDataVooIdaSelected(true);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleDataVoltaChange = (event, selectedDate) => {
    setShowDataVooVoltaPicker(false);
    setDataVooVoltaSelected(true);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const onCleanFilters = () => {
    setAdults(0);
    setChildren(0);
    setInfants(0);
    setNonStop(true);
    setReturnDate(new Date());
    setDepartureDate(new Date());
    setDataVooIdaSelected(false);
    setDataVooVoltaSelected(false);
    setDestinationLocationCode('');
    setOriginLocationCode('');
  };

  console.log('flightOffers::', flightOffers);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.heading}>Buscador de Voos:</Text>

          <Text style={styles.label}>Origem:</Text>
          <TextInput
            value={originLocationCode}
            style={styles.input}
            placeholder="Digite a origem (IATA Code) *"
            onChangeText={(text) => setOriginLocationCode(text.toUpperCase())}
          />

          <Text style={styles.label}>Destino:</Text>
          <TextInput
            value={destinationLocationCode}
            style={styles.input}
            placeholder="Digite o destino (IATA Code) *"
            onChangeText={(text) => setDestinationLocationCode(text.toUpperCase())}
          />

          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data de partida: *</Text>
            <Button color="#ef7946" title={dataVooIdaSelected ? formatDateToString(departureDate) : 'Selecionar Data'} onPress={() => setShowDataVooIdaPicker(true)} />
            {showDataVooIdaPicker && (
              <DateTimePickerModal
                value={departureDate}
                mode="date"
                display="calendar"
                onChange={handleDataIdaChange}
              />
            )}
          </View>

          <View style={{marginBottom: 20, marginTop: 8}}>
            <Text style={{marginBottom: 8}}>Data de retorno:</Text>
            <Button color="#ef7946" title={dataVooVoltaSelected ? formatDateToString(returnDate) : 'Selecionar Data'} onPress={() => setShowDataVooVoltaPicker(true)} />
            {showDataVooVoltaPicker && (
              <DateTimePickerModal
                value={returnDate}
                mode="date"
                display="calendar"
                onChange={handleDataVoltaChange}
              />
            )}
          </View>

          <QuantityInput label="Quantidade de adultos (De 12 ou + anos): *" initialValue={adults} onChangeQuantity={setAdults} />

          <QuantityInput label="Quantidade de crianças (De 2 a 11 anos):" initialValue={children} onChangeQuantity={setChildren} />

          <QuantityInput label="Quantidade de bebês:" initialValue={infants} onChangeQuantity={setInfants} />

          <Text style={styles.label} marginBottom={6}>Voos Diretos:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={nonStop}
              onValueChange={(itemValue) => setNonStop(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Sim" value={true} />
              <Picker.Item label="Não" value={false} />
            </Picker>
          </View>

          <View style={{gap: 10}}>
            <Button
              title="Buscar Voos"
              onPress={handleSearch}
              color="#ef7946"
              disabled={
                originLocationCode.length === 0 ||
                destinationLocationCode.length === 0 ||
                !dataVooIdaSelected ||
                adults < 1
              }
            />

            <Button
              title="Limpar Filtros"
              onPress={onCleanFilters}
            />
          </View>

          <View>
            {flightOffers && flightOffers.length >= 1 && flightOffers.map((offer) => (
              <FlightOfferCard key={offer.id} flightOffer={offer} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  }
});

export default OffersSearchView;
