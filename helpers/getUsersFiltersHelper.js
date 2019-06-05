const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetUsersFiltersHelper {


  getAllFilters(filterByTerm) {
    const finalResult = this.resultBasedOnFilter(
      filterByTerm);
      console.log('finalResult>>>', finalResult)
      
    return finalResult;
  }
  resultBasedOnFilter(filterTerm) {
    console.log('filterTerm>>>', filterTerm)
  
      if (filterTerm === "all") {
        return ['all doesnt have any filters'];
      } 
      // else if (filterTerm === "organisation") {
        let organisations = this.getAllKeys(Organisations);
        // return organisations;
      // }
      // else if (filterTerm === "users") {
        let users = this.getAllKeys(Users);
      // //   return (allKeysInOrg);
      // // }
      // // else if (filterTerm !== "tickets") {
        let tickets = this.getAllKeys(Tickets);
      //   return (allKeysInOrg);
      // }
      return {organisations, users, tickets}
      // else {
      //   console.log('>ELSE GetUsersFiltersHelper>>');
      // }
}

  getAllKeys(array) {
    const details = (array).reduce((previous, current) => {return current || []}); //TODO: REMOVE TERN
    return Object.keys(details);
  }
}


module.exports = GetUsersFiltersHelper;
