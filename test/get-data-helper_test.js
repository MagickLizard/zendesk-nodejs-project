

const GetSupportSummaries = require('../helpers/getDataHelper.js'); 
// const fixture = require('./fixtures/fixtures.js');
const mocha = require('mocha');
const should = require('chai').should;

describe('GetSupportSummaries()', () => {
  it('should return a list of user related data', async () => {
    const getDataHelper = new GetSupportSummaries();
    console.log('getDataHelper>>', getDataHelper)
    getDataHelper.getAll().should.deep.equal();
  }).timeout(3000);

  // TODO: Add more tests
});

