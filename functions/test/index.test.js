const { expect } = require('chai');
const { dialogflowFirebaseFulfillment } = require('../src/index.js');

describe('test firebaseFunction', () => {
  it('movieTest', () => {
    const req = {
      body: {
        queryResult: {
          parameters: {
            movie: 'fight club',
          },
        },
      },
    };
    const res = {
      json: (responseBody) => {
        expect(responseBody).to.be.a('object');
        expect(responseBody.fulfillmentText).to.be.a('string');
        const expectedTextMovie = 'description: ';
        const includeText = responseBody.fulfillmentText.startsWith(expectedTextMovie);
        expect(includeText).to.equal(true);
      },
    };
    dialogflowFirebaseFulfillment(req, res);
  });
  it('movie test', () => {
    const req = {
      body: {
        queryResult: {
          parameters: {
            movie: 'Peroutunis',
          },
        },
      },
    };
    const res = {
      json: (responseBody) => {
        // console.log(responseBody);
        expect(responseBody).to.be.a('object');
        expect(responseBody.fulfillmentText).to.be.a('string');
        const expectedTextMovie = 'Desole nous n\'avons pas trouvé le film demandé';
        expect(responseBody.fulfillmentText).to.equal(expectedTextMovie);
      },
    };
    dialogflowFirebaseFulfillment(req, res);
  });
});
