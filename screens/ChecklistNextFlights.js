/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { useMain } from '../contexts/MainContext';
import formatStringToDate from '../utils/formatStringToDate';

function ChecklistNextFlightsView() {
  const { clients } = useMain();
  const [nextFlights, setNextFlights] = useState([]);

  useEffect(() => {
    // Filter flights for the next 5 days based on DataVoo
    const today = new Date();
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(today.getDate() + 5);
    const nextFlightsData = clients.filter((client) => {
      if (!client.dataVoo) return;
      const flightDate = formatStringToDate(client.dataVoo);
      return flightDate >= today && flightDate <= fiveDaysFromNow;
    });

    setNextFlights(nextFlightsData);
  }, [clients]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.nextFlightsView}>
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
