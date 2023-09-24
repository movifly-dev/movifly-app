import axios from 'axios';

const BASE_URL = 'https://test.api.amadeus.com/v2';

const searchFlightOffers = async (searchParams, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/shopping/flight-offers`, {
      params: searchParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    // if (error.response) {
    //   const responseData = error.response.data;
    //   if (responseData && responseData.errors) {
    //     const firstError = responseData.errors[0];
    //     const errorCode = firstError.code;
    //     const errorMessage = firstError.detail;
    //     console.error('Amadeus API Error Code:', errorCode);
    //     console.error('Amadeus API Error Message:', errorMessage);
    //   }
    //   console.error('Full API Response:', responseData);
    // } else {
    // }
    throw new Error('API request error:', error);
  }
};

export default searchFlightOffers;
