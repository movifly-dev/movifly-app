/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import FlightOfferCard from '../FlightOffersResults';

const FlightOffersResultsListing = ({ route }) => {
  const { flightOffers } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {flightOffers.map((offer) => (
            <FlightOfferCard key={offer.id} flightOffer={offer} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default FlightOffersResultsListing;
