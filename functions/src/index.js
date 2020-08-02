// @flow
const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://api.themoviedb.org/3/movie/550?api_key=15c997966d7f306fb907fb8332fd350e',
  headers: { }
};

axios(config)
.then(function (response) {
// console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  // console.log(error);
});
