import axios from 'axios';

// Function to search cities by keyword
async function searchCitiesByKeyword(keyword, maxResults, accessToken) {
  try {
    const endpoint = 'https://test.api.amadeus.com/v1/reference-data/locations';

    const response = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        keyword: 'MUC',
        subType: ['AIRPORT', 'CITY'],
        'page[limit]': maxResults,
      },
    });

    const locations = response.data.data;
    console.log('cities', response);

    return locations;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.error('HTTP Error:', error.response.status);
      console.error('Error Details:', error.response.data.errors[0]);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request Error:', error.message);
    }
    // You can choose to return a default value or re-throw the error here
    throw new Error('Error searching locations: ' + error);
  }
}

export default searchCitiesByKeyword;
