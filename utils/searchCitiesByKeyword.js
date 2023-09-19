import axios from 'axios';

// Function to search cities by keyword
async function searchCitiesByKeyword(keyword, maxResults, accessToken) {
  try {
    // Define the API endpoint
    const endpoint = 'https://test.api.amadeus.com/v1/reference-data/locations/cities';

    console.log('FSDFDSFDS');
    // Make the GET request
    const response = await axios.get(endpoint, {
      keyword: keyword,
      max: maxResults,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    // Extract and return the city data from the response
    const cities = response.data.data;
    console.log('cities', cities);

    return cities;
  } catch (error) {
    throw new Error('Error searching cities: ' + error);
  }
}

export default searchCitiesByKeyword;
