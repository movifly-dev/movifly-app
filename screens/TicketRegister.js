/* eslint-disable no-undef */
import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

function TicketRegisterView() {
  const [lastName, setLastName] = useState('');
  const [bookingReference, setBookingReference] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);
  const [amadeusAPIKey, setAmadeusAPIKey] = useState('');

  const handleGetAccessToken = async () => {
    try {
      const clientId = 'FS4GaCt54aHQw1FU8RnBRJpwXHT0VEO0';
      const clientSecret = 'h2flJH82Cajjr8tm';
      const baseUrl = 'https://test.api.amadeus.com/v1';

      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('client_id', clientId);
      formData.append('client_secret', clientSecret);

      const response = await axios.post(`${baseUrl}/security/oauth2/token`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setAmadeusAPIKey(response.data.access_token);
      return response.data.access_token; // Return the access token
    } catch (error) {
      console.log('Error getting access token:', error.message);
      alert('Failed to retrieve the access token. Please check your credentials.');
    }
  };

  const handleLinkReservation = async () => {
    try {
      if (!lastName || !bookingReference) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (!amadeusAPIKey) {
        await handleGetAccessToken();
        if (!amadeusAPIKey) {
          // Access token not obtained, exit
          return;
        }
      }

      const baseUrl = 'https://test.api.amadeus.com/v1';

      const response = await axios.get(`${baseUrl}/shopping/flight-offers/pricing`, {
        headers: {
          Authorization: `Bearer ${amadeusAPIKey}`,
        },
        params: {
          travelerLastName: lastName,
          bookingReference: bookingReference,
        },
      });

      setFlightDetails(response.data);
    } catch (error) {
      alert('Erro ao buscar detalhes da reserva. Verifique suas informações.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ticketRegisterView}>
          <Text style={styles.label}>Último Sobrenome:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder="Digite seu último sobrenome"
          />

          <Text style={styles.label}>Código da Reserva ou ID da Viagem:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setBookingReference(text)}
            value={bookingReference}
            placeholder="Digite o código da reserva ou ID da viagem"
          />

          <Button title="Buscar Detalhes da Reserva" onPress={handleLinkReservation} />

          {flightDetails && (
            <View style={styles.flightDetailsContainer}>
              <Text style={styles.flightDetailsLabel}>Detalhes da Reserva:</Text>
              {JSON.stringify(flightDetails)}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TicketRegisterView;

const styles = {
  ticketRegisterView: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
    marginBottom: 20,
  },
  flightDetailsContainer: {
    marginTop: 20,
  },
  flightDetailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};
