/* eslint-disable no-undef */
import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { encode } from 'base-64';

function TicketRegisterView() {
  const [lastName, setLastName] = useState('');
  const [pnrCode, setPnrCode] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  const handleGetAccessToken = async () => {
    try {
      const userId = 'VjE6Njl2MmNpOXEyazZzeTZ2dzpERVZDRU5URVI6RVhU';
      const password = 'TEpKOWVwbTc=';

      const authHeader = encode(`${userId}:${password}`);
      const baseUrl = 'https://api.havail.sabre.com/v2/auth/token';

      const data = {
        grant_type: 'client_credentials',
      };

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      };
      const response = await axios.post(baseUrl, new URLSearchParams(data).toString(), config);
      setAccessToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error.message);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      alert('Failed to retrieve the access token. Please check your credentials.');
    }
  };


  useEffect(() => {
    if (accessToken) {
      handleLinkReservation();
    }
  }, [accessToken]);


  const handleLinkReservation = async () => {
    try {
      if (!lastName || !pnrCode) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (!accessToken) {
        await handleGetAccessToken();
        if (!accessToken) {
          alert('accessToken NONE', accessToken);
          return;
        }
      }
      alert('accessToken', accessToken);

      const baseUrl = 'api.cert.platform.sabre.com/v1/trip/orders';

      const response = await axios.get(`${baseUrl}/getBooking`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          surname: lastName,
          confirmationId: pnrCode,
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
            onChangeText={(text) => setPnrCode(text)}
            value={pnrCode}
            placeholder="Digite o código da reserva ou ID da viagem"
          />

          <Button title="Buscar Detalhes da Reserva" onPress={handleLinkReservation} color="rgba(239, 121, 70, 1)"/>

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
