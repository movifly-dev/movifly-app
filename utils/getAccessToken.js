// /* eslint-disable no-undef */
// import axios from 'axios';

// const clientId = 'FS4GaCt54aHQw1FU8RnBRJpwXHT0VEO0';
// const clientSecret = 'h2flJH82Cajjr8tm';
// const baseUrl = 'https://test.api.amadeus.com/v1';

// async function getAccessToken() {
//   try {
//     const response = await axios.post(`${baseUrl}/security/oauth2/token`, {
//       grant_type: 'client_credentials',
//       client_id: clientId,
//       client_secret: clientSecret,
//     });
//     console.log('RESPONSE', response);
//     const accessToken = response.data.access_token;
//     return accessToken;
//   } catch (error) {
//     throw new Error('Error ao acessar token:' + error.message);
//   }
// }

// export default getAccessToken;
