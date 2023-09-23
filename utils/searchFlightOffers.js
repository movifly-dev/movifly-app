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

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      const responseData = error.response.data;

      // Check if there's an error code and message in the API response
      if (responseData && responseData.errors) {
        const firstError = responseData.errors[0]; // Assuming there might be multiple errors
        const errorCode = firstError.code;
        const errorMessage = firstError.detail;

        // Log or handle the error code and message
        console.error('Amadeus API Error Code:', errorCode);
        console.error('Amadeus API Error Message:', errorMessage);
      }

      // Log the full response for further debugging if needed
      console.error('Full API Response:', responseData);
    } else {
      // The request was not even made, and there's no response to inspect
      console.error('Network Error:', error.message);
    }

    throw new Error('API request error:', error);
  }
};

export default searchFlightOffers;
