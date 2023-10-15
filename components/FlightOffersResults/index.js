/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import formatDuration from '../../utils/formatDuration';
import getAirlineDetails from '../../utils/getAirlineByCode';
import { useMain } from '../../contexts/MainContext';
import { LinearGradient } from 'expo-linear-gradient';

const FlightOfferCard = ({ flightOffer, dataVooIdaSelected }) => {
  const { accessToken, fetchAccessToken } = useMain();
  const {
    price,
    validatingAirlineCodes,
    itineraries,
  } = flightOffer;
  const [airlineName, setAirlineName] = useState('');

  useEffect(() => {
    const fetchAirlineDetails = async () => {
      try {
        await fetchAccessToken();
        const airlineName = await getAirlineDetails(validatingAirlineCodes[0], accessToken);
        setAirlineName(airlineName[0].commonName);
      } catch(error) {
        throw new Error('Erro ao carregar nome da companhia aérea');
      }
    };

    fetchAirlineDetails();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.container}>
          <View>
            <Text style={styles.title}>Companhia Aérea:</Text>
            <Text style={styles.detail}>{airlineName}</Text>
          </View>

          <View>
            <Text style={styles.title}>Direto:</Text>
            {itineraries.every((itinerary) => itinerary.segments.length === 1) ? (
              <Text style={styles.detail}>Sim</Text>
            ) : (
              <Text style={styles.detail}>Não</Text>
            )}
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
                {itinerary.segments.map((segment, segmentIndex) => (
                  <View key={segmentIndex}>
                    <Text style={styles.itinerary}>
                      {segment.departure.iataCode} ({formatTime(segment.departure.at)}) {'->'}
                      {segment.arrival.iataCode} ({formatTime(segment.arrival.at)})
                    </Text>
                    <Text style={styles.itinerary}>
                    Duração do voo: {formatDuration(segment.duration)}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
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
    marginLeft: 10,
  },
});

export default FlightOfferCard;
