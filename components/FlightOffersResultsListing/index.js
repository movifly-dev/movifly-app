/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import FlightOfferCard from '../FlightOffersResults';
import { Feather } from '@expo/vector-icons';

const FlightOffersResultsListing = ({ route }) => {
  const { flightOffers, nonStop, departureDate } = route.params;

  const getDayNumber = (dateString) => {
    const [day] = dateString.split('/');
    return parseInt(day, 10);
  };

  const getMonthName = (dateString) => {
    const [, month] = dateString.split('/');

    // Assuming your months are in Portuguese. You can adjust the month names as needed.
    const monthNames = [
      'JAN.', 'FEV.', 'MAR.', 'ABR.', 'MAI.', 'JUN.',
      'JUL.', 'AGO.', 'SET.', 'OUT.', 'NOV.', 'DEZ.'
    ];

    return monthNames[parseInt(month, 10) - 1];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultsListingView}>
          <View style={styles.dateContainer}>
            <Feather name="arrow-up-right" size={24} color="white" />
            <Text  style={styles.dateText}>
              <Text style={styles.dayText}>{getDayNumber(departureDate)}</Text>{'\n'}
              <Text Text style={styles.monthText}>{getMonthName(departureDate)}</Text>
            </Text>
          </View>
          {flightOffers.map((offer) => (
            <FlightOfferCard key={offer.id} flightOffer={offer} nonStop={nonStop} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default FlightOffersResultsListing;

const styles = StyleSheet.create({
  resultsListingView: {
    flex: 1,
    padding: 20,
  },
  dateContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#CCC',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  dateText: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 4,
    fontSize: 16,
  },
  monthText: {
    fontWeight: 'bold',
  }
});
