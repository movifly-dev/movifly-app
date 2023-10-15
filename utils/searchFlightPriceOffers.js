import axios from 'axios';
// import { useMain } from '../contexts/MainContext';
const BASE_URL = 'https://test.api.amadeus.com/v1';

const confirmFlightOfferPricing = async (flightOffersData, accessToken) => {
  // const { accessToken, fetchAccessToken } = useMain();
  // console.log('accessToken1', accessToken);
  try {
    // await fetchAccessToken();
    console.log('flightOffersData', flightOffersData);
    const response = await axios.post(`${BASE_URL}/shopping/flight-offers/pricing`,
      {
        data: {
          type: 'flight-offers-pricing',
          flightOffers: flightOffersData,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-HTTP-Method-Override': 'GET'
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      const responseData = error.response.data;
      if (responseData && responseData.errors) {
        const firstError = responseData.errors[0];
        const errorCode = firstError.code;
        const errorMessage = firstError.detail;
        console.error('Amadeus API Error Code:', errorCode);
        console.error('Amadeus API Error Message:', errorMessage);
      }
      console.error('Full API Response:', responseData);
      console.error('Full API source:', responseData.errors[0]);

    }
    throw new Error('Erro ao pegar valores atualizados dos voos:', error);
  }
};

export default confirmFlightOfferPricing;
