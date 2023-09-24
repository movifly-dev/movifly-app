/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlightOfferCard = ({ flightOffer }) => {
  const {
    id,
    lastTicketingDate,
    price,
    validatingAirlineCodes,
    numberOfBookableSeats,
    itineraries,
  } = flightOffer;

  return (
    <View style={styles.container}>
      <Text style={styles.offerId}>Offer ID: {id}</Text>
      <Text style={styles.airline}>
        Airline Codes: {validatingAirlineCodes.join(', ')}
      </Text>
      <Text style={styles.seats}>Available Seats: {numberOfBookableSeats}</Text>
      <Text style={styles.ticketingDate}>
        Last Ticketing Date: {lastTicketingDate}
      </Text>
      <Text style={styles.price}>Price: {price.grandTotal} {price.currency}</Text>
      <Text style={styles.itinerary}>Itineraries:</Text>
      {itineraries.map((itinerary, index) => (
        <Text key={index} style={styles.itineraryItem}>
          - {itinerary.segments.map((segment) => segment.departure.iataCode).join(' -> ')}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  offerId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  airline: {
    marginTop: 8,
  },
  seats: {
    marginTop: 8,
  },
  ticketingDate: {
    marginTop: 8,
  },
  price: {
    marginTop: 8,
  },
  itinerary: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  itineraryItem: {
    marginLeft: 16,
    marginTop: 4,
  },
});

export default FlightOfferCard;
