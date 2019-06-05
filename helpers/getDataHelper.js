const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {
    this.users = '';
    this.tickets = '';
    this.organisations = '';
  }
  getAll(searchTerm) {
    const searchTermValidated = checkTypeOfItem(searchTerm);
    this.organisations = filterByValue(Organisations, searchTermValidated);
    this.tickets = filterByValue(Tickets, searchTermValidated);
    this.users = filterByValue(Users, searchTermValidated);
    if(this.users.length == 0 && this.tickets == 0 && this.organisations == 0) {
      return 'Nothing was found, please search again.';
    }
    return {all_relating_information: [{organisations: this.organisations, tickets: this.tickets, users: this.users}]};
  }

  getByFilterOptions(searchTerm, filterByKey, parentSummary) {
    return this.resultBasedOnFilter(searchTerm, filterByKey, Object.keys(parentSummary));
  }
  resultBasedOnFilter(searchTerm, filterByKey, parentSummary) {
    const searchTermValidated = checkTypeOfItem(searchTerm);
    if (parentSummary && parentSummary.organisations) {
      return this.getOrganisationByFilters(searchTermValidated, filterByKey);
    }
    else if (parentSummary && parentSummary.tickets) {
      return this.getTicketsByFilters(searchTermValidated, filterByKey);
    }
    else if (parentSummary && parentSummary.users) {
      return this.getUsersByFilters(searchTermValidated, filterByKey);
    }
    else {
      return [];
    }
  }

  getOrganisationByFilters(searchTermValidated, filterByKey) {
    this.organisations = this.searchResultsByFilters(Organisations, searchTermValidated, filterByKey);
    this.tickets = this.searchResultsByFilters(Tickets, searchTermValidated, 'organization_id');
    this.users = this.searchResultsByFilters(Users, searchTermValidated, 'organization_id');
    if(this.users.length == 0 && this.tickets == 0 && this.organisations == 0) {
      return 'Nothing was found, please search again.';
    }
    return {organisation: this.organisations, organisation_related_information: [{related_tickets: this.tickets, related_users: this.users}]};
  }
  
  getTicketsByFilters(searchTermValidated, filterByKey) {
    this.tickets = this.searchResultsByFilters(Tickets, searchTermValidated, filterByKey);
    const getOrganisationId = this.getAllInformation(this.tickets, 'organization_id');
    this.users = this.searchResultsByFilters(Users, getOrganisationId, 'organization_id');
    this.organisations = this.searchResultsByFilters(Organisations, getOrganisationId, '_id');
    if(this.users.length == 0 && this.tickets == 0 && this.organisations == 0) {
      return 'Nothing was found, please search again.';
    }
    return {ticket: this.tickets, ticket_related_information: [{related_organisations: this.organisations, related_users: this.users}]};
  }
  getUsersByFilters(searchTermValidated, filterByKey) {
    this.users = this.searchResultsByFilters(Users, searchTermValidated, filterByKey);
    const getOrganisationId = this.getAllInformation(this.users, 'organization_id');
    this.tickets = this.searchResultsByFilters(Tickets, getOrganisationId, 'organization_id');
    this.organisations = this.searchResultsByFilters(Organisations, getOrganisationId, '_id');
    if(this.users.length == 0 && this.tickets == 0 && this.organisations == 0) {
      return 'Nothing was found, please search again.';
    }
    return {user: this.users, ticket_related_information: [{related_organisations: this.organisations, related_users: this.tickets}]};
  }

  getAllInformation(array, stringOfKeyWanted) {
    const keyOfField = array.reduce((previous, current) => {
      if (current[stringOfKeyWanted]) {
        return current[stringOfKeyWanted];
      }
    }, {});
    if (keyOfField) {
      const keyFormatted = checkTypeOfItem(keyOfField);
      return keyFormatted;
    }
    return "";
  }

  searchResultsByFilters(jsonData, searchTerm, filterByKey) {
    return this.getResultsByKey(jsonData, searchTerm, filterByKey);
  }
  getResultsByKey(array, searchTerm, idReference) {
    const values = (array).map((k) => {
      const keyIsString = checkTypeOfItem(k[idReference] || "");
      if (keyIsString) {
        return checkValueIncludesTerm(keyIsString, searchTerm, k);
      }
    })
    const uniqueArray = values.filter((item, pos) => values.indexOf(item) == pos)
    return (uniqueArray).filter((i) =>  i);
  }
}
function filterByValue(array, searchTerm) {
  let arrayWithResults = [];
  array.filter(o => {
    return Object.keys(o).some(key => {
      let values = checkTypeOfItem(o[key]);
      if (values) {
        if (typeof values === "string") {
          let checkedTopValue = checkValueIncludesTerm(values, searchTerm, o);
          if (checkedTopValue) {
            arrayWithResults.push(checkedTopValue);
          }
        }
        if (typeof values === "object") {
          return Object.keys(values).some(key => {
            if (typeof values[key] === "string") {
              let nestedResult = checkValueIncludesTerm(
                values[key],
                searchTerm,
                o
              );
              if (nestedResult) {
                arrayWithResults.push(nestedResult);
              }
            }
          });
        }
      }
    });
  });
  return arrayWithResults;
}

function checkTypeOfItem(value) {
  try {
    if (typeof value === "string") {
      return value;
    } else if (typeof value === "object" && value.length > 0) {
      return arrayToObject(value);
    }
    else if (typeof value === "number") {
      return value.toString();
    }
    else {
      return value;
    }
  } catch (Error) {
    return Error;
  }
}

function checkValueIncludesTerm(valueInArray, searchTerm, parentObject) {
  try {    
    if (searchTerm && valueInArray.toLowerCase().includes(searchTerm.toLowerCase())) {
      return parentObject;
    }
  } catch (Error) {
    return "ERROR";
  }
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

module.exports = GetDataHelper;
