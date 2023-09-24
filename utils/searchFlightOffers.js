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
    console.log('responseData::', response.data);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const responseData = error.response.data;
      if (responseData && responseData.errors) {
        throw new Error('API request error:', responseData.errors[0]);
      }
    } else {
      throw new Error('API request error:', error);
    }

  }
};

export default searchFlightOffers;
