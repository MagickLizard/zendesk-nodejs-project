const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetUsersFiltersHelper {


  getAllFilters(filterByTerm) {
    const finalResult = this.resultBasedOnFilter(
      filterByTerm);
    return finalResult;
  }
  resultBasedOnFilter(filterTermArray) {
    const filterTerm = (filterTermArray).reduce((previous, current) => {return current || []});
      if (filterTerm === "all") {
        return ['all doesnt have any filters'];
      } else if (filterTerm === "organisation") {
        return this.getAllKeys(Organisations);
      }
      else if (filterTerm === "users") {
        let allKeysInOrg = this.getAllKeys(Users);
        return (allKeysInOrg);
      }
      else if (filterTerm !== "tickets") {
        let allKeysInOrg = this.getAllKeys(Tickets);
        return (allKeysInOrg);
      }
      else {
        console.log('>ELSE GetUsersFiltersHelper>>');
      }
}

  getAllKeys(array) {
    const details = (array).reduce((previous, current) => {return current || []}); //TODO: REMOVE TERN
    return Object.keys(details);
  }
}


module.exports = GetUsersFiltersHelper;
