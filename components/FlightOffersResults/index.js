/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ISO8601ToDate from '../../utils/ISO8601ToDate';
import formatDuration from '../../utils/formatDuration';

const FlightOfferCard = ({ flightOffer }) => {
  const {
    lastTicketingDate,
    price,
    validatingAirlineCodes,
    numberOfBookableSeats,
    itineraries,
  } = flightOffer;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Código da Companhia Aérea: </Text>
        <Text style={styles.detail}>
          {validatingAirlineCodes.join(', ')}
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Assentos Disponíveis: </Text>
        <Text style={styles.detail}>{numberOfBookableSeats}</Text>
      </View>

      <View>
        <Text style={styles.title}>
        Data Limite para Emissão de Bilhete:
        </Text>
        <Text style={styles.detail}>
          {ISO8601ToDate(lastTicketingDate)}
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Preço: </Text>
        <Text style={styles.detail}>
          R$ {price.grandTotal} {price.currency}
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Itinerário:</Text>
        {itineraries.map((itinerary, index) => (
          <View key={index}>
            <Text style={styles.itinerary}>
              {itinerary.segments.map((segment) => segment.departure.iataCode).join(' -> ')}
            </Text>
            {itinerary.duration && (
              <Text style={styles.itinerary}>
              Duração: {formatDuration(itinerary.duration)}
              </Text>
            )}
          </View>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#FFF',
  },
  detail: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
  },
  itinerary: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
    marginLeft: 10
  }
});

export default FlightOfferCard;
