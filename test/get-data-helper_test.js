const GetDataHelper = require("../helpers/getDataHelper.js");
const fixture = require("./fixtures/fixtures.js");
const should = require("chai").should;
const expect = require("chai").expect;

describe("GetSupportSummaries()", () => {
  let getDataHelper;
  beforeEach(() => {
    getDataHelper = new GetDataHelper();
  });
  it('should be defined', () => {
    getDataHelper = new GetDataHelper();
    expect(getDataHelper).to.exist;
  });

  it("getAll() - should return a list of related data", () => {
    const result = getDataHelper.getAll("0db0c1da-8901-4dc3-a469-fe4b500d0fca");

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
    let errorFixture = { organisations: [], tickets: [], users: [] }
    expect(result).to.exist;
    expect(result).to.deep.equal(errorFixture);
  });

});
