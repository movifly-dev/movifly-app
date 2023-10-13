import axios from 'axios';

const getAirlineDetails = async (airlineCode, accessToken) => {
  try {
    const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/airlines', {
      params: {
        airlineCodes: airlineCode.toUpperCase(),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const airlineDetails = response.data.data;
    return airlineDetails;
  } catch (error) {
    throw new Error('Erro ao buscar detalhes da companhia aérea:' + error.message);
  }
};

export default getAirlineDetails;
