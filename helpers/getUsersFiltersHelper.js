const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetUsersFiltersHelper {
  getAllFilters() {
    return this.resultBasedOnFilter();
  }
  resultBasedOnFilter() {
    const organisations = this.getAllKeys(Organisations);
    const users = this.getAllKeys(Users);
    const tickets = this.getAllKeys(Tickets);
    return {organisations, users, tickets};
  }

  getAllKeys(array) {
    const details = array.reduce((previous, current) => {
      return current || [];
    });
    return Object.keys(details);
  }
}

module.exports = GetUsersFiltersHelper;
