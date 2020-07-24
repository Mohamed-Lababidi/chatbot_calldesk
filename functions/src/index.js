// @flow
const http = require('http');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const util = require('util');

admin.initializeApp();

const host = 'api.worldweatheronline.com';
const wwoApiKey = 'd2df1ffab34e4c788f3143210202007';

function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    const path = `/premium/v1/weather.ashx?format=json&num_of_days=1&q=${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;

    http.get({ host, path }, (res) => {
      let body = '';
      res.on('data', (d) => { body += d; });
      res.on('end', () => {
        const response = JSON.parse(body);
        // console.log(util.inspect(response, { depth: 5 }));
        const forecast = response.data.weather[0];
        const location = response.data.request[0];
        const conditions = response.data.current_condition[0];
        const currentConditions = conditions.weatherDesc[0].value;

        const output = `Current conditions in the ${location.type} 
        ${location.query} are ${currentConditions} with a projected high of
        ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of 
        ${forecast.mintempC}°C or ${forecast.mintempF}°F on 
        ${forecast.date}.`;

        resolve(output);
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
  });
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  console.log(JSON.stringify(req.body));
  const city = req.body.queryResult.parameters['geo-city'];
  let date = '';
  if (req.body.queryResult.parameters.date) {
    date = req.body.queryResult.parameters.date;
  }
  callWeatherApi(city, date)

    .then((output) => res.json({ fulfillmentText: output }))
    .catch(() => {
      res.json({ fulfillmentText: 'I don\'t know the weather but I hope it\'s good!' });
    });
});

exports.fonctionBidon = functions.https.onRequest((req, res) => {
  console.log('body de la requete', req.body);
  console.log('reponse', res, res.json);
  if (req.body.city === 'Paris') {
    res.json({ weather: 'Il fait beau a Paris' });
  } else if (req.body.city === 'Toulouse') {
    res.json({ weather: 'Il fait trop chaud a Toulouse' });
  } else {
    res.json({ weather: 'Je ne sais pas ce que tu veux !' });
  }
});
