/* eslint-disable no-undef */
import axios from 'axios';

async function getAmadeusAccessToken() {
  const clientId = 'FS4GaCt54aHQw1FU8RnBRJpwXHT0VEO0';
  const clientSecret = 'h2flJH82Cajjr8tm';
  const tokenEndpoint = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  try {
    const response = await axios.post(tokenEndpoint, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.state !== 'approved' || response.data.access_token.length === 0) {
      getAmadeusAccessToken();
    }

    const accessToken = response.data.access_token;
    return accessToken;

  } catch (error) {
    throw new Error('Error retrieving Amadeus access token: ' + error.message);
  }
}

export default getAmadeusAccessToken;
