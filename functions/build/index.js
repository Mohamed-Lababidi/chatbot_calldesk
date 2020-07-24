// flow
const http = require('http');

const functions = require('firebase-functions');

const host = 'api.worldweatheronline.com';
const wwoApiKey = 'd2df1ffab34e4c788f3143210202007';

function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    const path = `${'/premium/v1/weather.ashx?format=json&num_of_days=1' + '&q='}${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`; // console.log(`API Request: ${host}${path}`);
    // Make the HTTP request to get the weather

    http.get({
      host,
      path
    }, res => {
      let body = ''; // var to store the response chunks

      res.on('data', d => {
        body += d;
      }); // store each response chunk

      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        const response = JSON.parse(body);
        const forecast = response.data.weather[0];
        const location = response.data.request[0];
        const conditions = response.data.current_condition[0];
        const currentConditions = conditions.weatherDesc[0].value; // Create response

        const output = `Current conditions in the ${location.type} 
        ${location.query} are ${currentConditions} with a projected high of
        ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of 
        ${forecast.mintempC}°C or ${forecast.mintempF}°F on 
        ${forecast.date}.`; // Resolve the promise with the output text
        // console.log(output);

        resolve(output);
      });
      res.on('error', error => {
        // console.log(`Error calling the weather API: ${error}`);
        reject(error);
      });
    });
  });
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // console.log('test method', req.method);
  // console.log(`test body:${JSON.stringify(req.body)}`);
  // Get the city and date from the request
  const city = req.body.queryResult.parameters['geo-city']; // city is a required param
  // Get the date for the weather forecast (if present)

  let date = '';

  if (req.body.queryResult.parameters.date) {
    date = req.body.queryResult.parameters.date; // console.log(`Date: ${date}`);
  } // Call the weather API
  // eslint-disable-next-line max-len


  callWeatherApi(city, date) // eslint-disable-next-line no-trailing-spaces
  .then(output => res.json({
    fulfillmentText: output
  })) // Return the results of the weather API to Dialogflow
  // eslint-disable-next-line function-paren-newline
  .catch(() => {
    res.json({
      fulfillmentText: 'I don\'t know the weather but I hope it\'s good!'
    });
  });
});