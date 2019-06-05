/* global it:false, describe:false, beforeEach:false */

const GetUsersFiltersHelper = require("../helpers/getUsersFiltersHelper.js");
const expect = require("chai").expect;

describe("GetUsersFiltersHelper()", () => {
  let getUsersFiltersHelper;
  beforeEach(() => {
    getUsersFiltersHelper = new GetUsersFiltersHelper();
  });
  it("Class should be defined", () => { 
    getUsersFiltersHelper = new GetUsersFiltersHelper();
    expect(getUsersFiltersHelper).to.exist;
  });
  describe("resultBasedOnFilter()", () => {
    it("#getAllKeys() - Should return all key ids.", () => {
     const keyFixture =  [ '_id',
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
          'role' ];
      const intendedResult = [ '0', '1', '2', '3' ]
      const result = getUsersFiltersHelper.getAllKeys(keyFixture);
      expect(result).to.deep.equal(intendedResult);
      expect(result).to.exist;
    });
  });
});
