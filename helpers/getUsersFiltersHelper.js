const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetUsersFiltersHelper {
  getAllFilters(filterByTerm) {
    const finalResult = this.resultBasedOnFilter(filterByTerm);
    console.log("finalResult>>>", finalResult);

    return finalResult;
  }
  resultBasedOnFilter(filterTerm) {
    console.log("filterTerm>>>", filterTerm);

    if (filterTerm === "all") {
      return ["all doesnt have any filters"];
    }
    const organisations = this.getAllKeys(Organisations);
    const users = this.getAllKeys(Users);
    const tickets = this.getAllKeys(Tickets);
    return {organisations, users, tickets};
  }

  getAllKeys(array) {
    const details = array.reduce((previous, current) => {
      return current || [];
    }); //TODO: REMOVE TERN
    return Object.keys(details);
  }
}

module.exports = GetUsersFiltersHelper;
