/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import FlightOfferCard from '../FlightOffersResults';

const FlightOffersResultsListing = ({ route }) => {
  const { flightOffers, nonStop, departureDate } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultsListingView} >
          <Text>{departureDate}</Text>
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
});
