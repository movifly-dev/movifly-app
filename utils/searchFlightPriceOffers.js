import axios from 'axios';
import { useMain } from '../contexts/MainContext';
const BASE_URL = 'https://test.api.amadeus.com/v2';

const confirmFlightOfferPricing = async (flightOffersData) => {
  const { accessToken, fetchAccessToken } = useMain();
  console.log('DSFDSFSDFDSFDSFDSFD');
  try {
    await fetchAccessToken();
    const response = await axios.post(`${BASE_URL}/shopping/flight-offers/pricing`, {
      flightOffersData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
    }
    throw new Error('API request error:', error);
  }
};

export default confirmFlightOfferPricing;
