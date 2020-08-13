// @flow
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const callMovieApi = (targetedMovieName) => new Promise((resolve, reject) => {
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/search/movie?api_key=  &language=fr-fr&query=${targetedMovieName}&page=1&include_adult=false`,
    headers: { },
  };

  const createOutput = (data) => `description: ${data.overview} \n sortie en: ${data.release_date}`;

  const findMovieAndCreateOutput = (response) => {
    const allMovies = response.data.results || [];
    const targetMovie = allMovies
      .find((movie) => movie.title.toUpperCase() === targetedMovieName.toUpperCase()
        || movie.title.toUpperCase().startsWith(targetedMovieName.toUpperCase()));
    if (!targetMovie) {
      return ('Desole nous n\'avons pas trouvé le film demandé');
    }
    return createOutput(targetMovie);
  };

  axios(config)
    .then((response) => resolve(findMovieAndCreateOutput(response)))
    .catch((error) => reject(error));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  const movieQuery = req.body.queryResult.parameters.movie;
  const movieName = Array.isArray(movieQuery) ? movieQuery[0] : movieQuery;

  callMovieApi(movieName)
    .then((output) => res.json({ fulfillmentText: output }))
    .catch(() => res.json('erreur'));
});
