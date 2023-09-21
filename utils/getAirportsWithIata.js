import axios from 'axios';

// Function to search airports by keyword
async function getAirportsWithIata(iataCode) {
  try {
    // Replace with the correct endpoint and API key
    const endpoint = 'https://airlabs.co/api/v9/airports';
    const apiKey = '2e4d77c2-b454-468a-9c82-e9fe2dda2127';

    const response = await axios.get(endpoint, {
      params: {
        api_key: apiKey,
        iata_code: iataCode,
      },
    });

    const airports = response.data.response;

    return airports;
  } catch (error) {
    throw new Error('Error searching airports: ' + error);
  }
}

export default getAirportsWithIata;
