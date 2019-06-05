/* global it:false, describe:false, beforeEach:false */
const fixture = require("./fixtures/fixtures.js");
const GetDataHelper = require("../helpers/getDataHelper.js");
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
    it("#getAll() 0 Should pass empty values should return a empty object", () => {
      const result = getDataHelper.getAll();
      expect(result).to.exist;
      expect(result).to.deep.equal('Nothing was found, please search again.');
    });
  });
  describe("resultBasedOnFilter()", () => {
    it("#resultBasedOnFilter() - Should return empty array when wrong input given.", () => {
      const result = getDataHelper.resultBasedOnFilter(
        "20",
        "_id",
        "organization_id"
      );
      expect(result).to.exist;
      expect(result).to.deep.equal([]);
    });
    it("#resultBasedOnFilter() - Missing parent array should return a empty array.", () => {
      const result = getDataHelper.resultBasedOnFilter(
        "0db0c1da-8901-4dc3-a469-fe4b500d0fca",
        "_id"
      );
      expect(result).to.exist;
      expect(result).to.deep.equal([]);
    });
  });
  describe("#getTicketsByFilters() && #getUsersByFilters()", () => {
    it("#getTicketsByFilters() - Should return ticket based on subject.", () => {

      const result = getDataHelper.getTicketsByFilters(
        "A Catastrophe in Bahamas",
        "subject",
      );
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._getTemplateBySubject());
    });
    it("#getTicketsByFilters() - Should return ticket based on sub string subject.", () => {
      const result = getDataHelper.getTicketsByFilters(
        "Bahamas",
        "subject",
      );
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._getTemplateBySubject());
    });
    it("#getTicketsByFilters() - Should return noValues because no input was given.", () => {

      const result = getDataHelper.getTicketsByFilters(
        "",
        "subject",
      );
      expect(result).to.exist;
      expect(result).to.deep.equal('noValues');
    });
    it("#getUsersByFilters() - Should return undefined values because incorrect input given.", () => {
      const result = getDataHelper.getUsersByFilters(
        "1wjodijo",
        "_id",
      );
      expect(result).to.exist;
      expect(result).to.equal('noValues');
    });
    it("#getUsersByFilters() - Should return user information based on name search.", () => {
      const result = getDataHelper.getUsersByFilters(
        "john",
        'name'
      );
      expect(result).to.exist;
      expect(result).to.deep.equal(fixture._getUserFilteredOnName());
    });
  });
});
