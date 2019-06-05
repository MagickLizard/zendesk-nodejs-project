/* global it:false, describe:false, beforeEach:false */

const GetDataHelper = require("../helpers/getDataHelper.js");
const fixture = require("./fixtures/fixtures.js");
const expect = require("chai").expect;

describe("GetSupportSummaries()", () => {
  let getDataHelper;
  beforeEach(() => {
    getDataHelper = new GetDataHelper();
  });
  it("Class should be defined", () => { 
    getDataHelper = new GetDataHelper();
    expect(getDataHelper).to.exist;
  });
  describe("getAll()", () => {
    it("getAll() - should return a list of related data", () => {
      const result = getDataHelper.getAll(
        "0db0c1da-8901-4dc3-a469-fe4b500d0fca" 
      );
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._getAllBasedTerm());
    });
    it("getAll() - Should return substring values", () => {
      const result = getDataHelper.getAll("4dc3");
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._getAllBasedTerm());
    });
    it("getAll() - passing empty values should return a empty object", () => {
      const result = getDataHelper.getAll();
      const errorFixture = {organisations: [], tickets: [], users: []};
      expect(result).to.exist;
      expect(result).to.deep.equal(errorFixture);
    });
  });
  describe("resultBasedOnFilter()", () => { 
    it("resultBasedOnFilter - Should return organisation, tickets and users that are related by organisation", () => {
      const summaryKeys = { users: 
        [ '_id',
          'url',
          'external_id',
          'name',
          'alias',
          'created_at',
          'active',
          'verified',
          'shared',
          'locale',
          'timezone',
          'last_login_at',
          'email',
          'phone',
          'signature',
          'organization_id',
          'tags',
          'suspended',
          'role' ] }
      const result = getDataHelper.resultBasedOnFilter(
        "35",
        "_id",
        summaryKeys
      );
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._responseByOrganisationId());
    });
    it("#resultBasedOnFilter - Should return empty array when wrong input given", () => {
      const result = getDataHelper.resultBasedOnFilter(
        "20",
        "_id",
        "organization_id"
      );
      expect(result).to.exist;
      expect(result).to.deep.equal([]);
    });
    it("resultBasedOnFilter - Missing parent array should return a empty array", () => {
      const result = getDataHelper.resultBasedOnFilter(
        "0db0c1da-8901-4dc3-a469-fe4b500d0fca",
        "_id"
      );
      expect(result).to.exist;
      expect(result).to.deep.equal([]);
    });
  });
});
