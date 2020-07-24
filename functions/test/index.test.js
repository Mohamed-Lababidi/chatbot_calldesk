const { expect } = require('chai');
const { dialogflowFirebaseFulfillment, fonctionBidon } = require('../src/index.js');

describe('test firebaseFunction', () => {
  it('test fonctionBidon', () => {
    // je cree un faux objet requete
    const fakeRequest = {
      // cet objet doit avoir un body car on fait une requete POST
      body: {},
    };
    const fakeResponse = {
      json: (data) => {
        console.log('la fonction json() de fakeResponse est appelee et elle recoit:', data);
      },
    };
    fonctionBidon(fakeRequest, fakeResponse);
  });

  // it('citytest', () => {
  //   const req = {
  //     body: {
  //       queryResult: {
  //         parameters: {
  //           'geo-city': 'Paris',
  //         },
  //       },
  //     },
  //   };
  //   const res = {
  //     json: (responseBody) => {
  //       console.log(responseBody);
  //       expect(responseBody).to.be.a('object');
  //       expect(responseBody.fulfillmentText).to.be.a('string');
  //       const expectedTextCity = 'Current conditions in the City Paris';
  //       const includeText = responseBody.fulfillmentText.startsWith(expectedTextCity);
  //       expect(includeText).to.equal(true);
  //     },
  //   };
  //   dialogflowFirebaseFulfillment(req, res);
  // });
  // it('citytest', () => {
  //   const req = {
  //     body: {
  //       queryResult: {
  //         parameters: {
  //           'geo-city': 'Poudlard',
  //         },
  //       },
  //     },
  //   };
  //   const res = {
  //     json: (responseBody) => {
  //       // console.log(responseBody);
  //       expect(responseBody).to.be.a('object');
  //       expect(responseBody.fulfillmentText).to.be.a('string');
  //       const expectedTextCity = 'I don/t know the weather but I hope it/s good! Poudlard';
  //       expect(responseBody.fulfillmentText).to.equal(expectedTextCity);
  //     },
  //   };
  //   dialogflowFirebaseFulfillment(req, res);
  // });
});
