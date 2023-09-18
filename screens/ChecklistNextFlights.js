/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { useMain } from '../contexts/MainContext';
import formatStringToDate from '../utils/formatStringToDate';
import { Picker } from '@react-native-picker/picker';

function ChecklistNextFlightsView() {
  const { clients } = useMain();
  const [nextFlights, setNextFlights] = useState([]);
  const [daysUntilFlight, setDaysUntilFlight] = useState(5); // Default to 5 days

  useEffect(() => {
    // Filter flights based on the selected number of days until the flight
    const today = new Date();
    const selectedDaysFromNow = new Date(today);
    selectedDaysFromNow.setDate(today.getDate() + daysUntilFlight);
    const nextFlightsData = clients.filter((client) => {
      if (!client.dataVoo) return;
      const flightDate = formatStringToDate(client.dataVoo);
      return flightDate >= today && flightDate <= selectedDaysFromNow;
    });

    setNextFlights(nextFlightsData);
  }, [clients, daysUntilFlight]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.nextFlightsView}>
          <Text marginBottom={12}>Selecione os dias até o próximo voo:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={daysUntilFlight}
              onValueChange={(itemValue) => setDaysUntilFlight(itemValue)}>
              <Picker.Item label="1 Dia" value={1} />
              <Picker.Item label="2 Dias" value={2} />
              <Picker.Item label="3 Dias" value={3} />
              <Picker.Item label="4 Dias" value={4} />
              <Picker.Item label="5 Dias" value={5} />
            </Picker>
          </View>
          {nextFlights.map((flight) => (
            <View key={flight.id} style={styles.flightItem}>
              <Text style={styles.flightInfoLabel}>Nome do Passageiro:</Text>
              <Text style={styles.flightInfoValue}>{flight.nomePassageiro}</Text>

              <Text style={styles.flightInfoLabel}>Lozalizador:</Text>
              <Text style={styles.flightInfoValue}>{flight.lozalizador}</Text>

              <Text style={styles.flightInfoLabel}>Companhia Aérea:</Text>
              <Text style={styles.flightInfoValue}>{flight.companhiaAerea}</Text>

              <Text style={styles.flightInfoLabel}>Data do Voo:</Text>
              <Text style={styles.flightInfoValue}>{flight.dataVoo}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ChecklistNextFlightsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  nextFlightsView: {
    flex: 1,
    padding: 20,
  },
  flightItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e06c2b',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  flightInfoLabel: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#FFF',
  },
  flightInfoValue: {
    flex: 2,
    fontSize: 16,
    color: '#FFF',
  },
});
