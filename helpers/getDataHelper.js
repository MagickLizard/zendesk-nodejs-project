const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {}

  getByFilterOptions(searchTerm, filterByKey, parentSummary) {
    
    const finalResult = this.resultBasedOnFilter(searchTerm, filterByKey, Object.keys(parentSummary));
    return finalResult;
  }
  getAll(searchTerm) {
    const searchTermValidated = checkTypeOfItem(searchTerm);
    const organisations = filterByValue(Organisations, searchTermValidated);
    const tickets = filterByValue(Tickets, searchTermValidated);
    const users = filterByValue(Users, searchTermValidated);
    return {organisations, tickets, users};
  }

  resultBasedOnFilter(searchTerm, filterByKey, parentSummary) {
    const searchTermValidated = checkTypeOfItem(searchTerm);
      if(parentSummary.organisations) {
        const organisations = this.allOrganisationDataResult(Organisations, searchTermValidated, filterByKey);
        const tickets = this.allOrganisationDataResult(Tickets, searchTermValidated, 'organization_id');
        const users = this.allOrganisationDataResult(Users, searchTermValidated, 'organization_id');
        const response = {organisation: organisations, organisation_related_information: tickets, users};
        return response;
      }
      if(parentSummary.tickets) {
        const tickets = this.allOrganisationDataResult(Tickets, searchTermValidated, filterByKey);
        const getOrganisationId = this.getAllInformation(tickets, 'organization_id');
        const users = this.allOrganisationDataResult(Users, getOrganisationId, 'organization_id');
        const organisations = this.allOrganisationDataResult(Organisations, getOrganisationId, '_id');
        const response = {ticket: tickets, ticket_related_information: organisations, users};
        return response;
      }
      if(parentSummary.users) {
        const users = this.allOrganisationDataResult(Users, searchTerm, filterByKey);
        const getOrganisationId = this.getAllInformation(users, 'organization_id');
        const tickets = this.allOrganisationDataResult(Tickets, getOrganisationId, 'organization_id');
        const organisations = this.allOrganisationDataResult(Organisations, getOrganisationId, '_id');
        const response = {user: organisations, user_related_information: tickets, users};
        return response;
      }
  }
  getAllInformation(array, stringOfKeyWanted) {
    let keyOfField = (array).reduce((previous, current) => {
      if(current[stringOfKeyWanted] ) {
        return current[stringOfKeyWanted] 
      }

    }, {});
    if(keyOfField) {
      const keyFormatted = checkTypeOfItem(keyOfField);
      return keyFormatted;
    }
    return "";
  }
  
  allOrganisationDataResult(jsonData, searchTerm, filterByKey) {
    const anyResult = this.getDataBasedOnOrgId(jsonData, searchTerm, filterByKey);
    return anyResult;
  }

  getDataBasedOnOrgId(array, searchTerm, idReference) {
    let values = (array).map((k) => {

      let idIsString = checkTypeOfItem(k[idReference] || "");
      if (idIsString) {
        let orgsWithId = checkValueIncludesTerm(idIsString, searchTerm, k);
        return orgsWithId;
      }
    })
    let uniqueArray = values.filter((item, pos) => values.indexOf(item) == pos)
    const removingBadValues = (uniqueArray).filter((i) =>  i);
    return removingBadValues;
  }
}
function filterByValue(array, searchTerm) {
  let arrayWithResults = [];
  array.filter(o => {
    //TODO: MAKE A FILTER FOR STRING AND OBJECT
    return Object.keys(o).some(key => {
      let values = checkTypeOfItem(o[key]);
      if (values) {
        if (typeof values === "string") {
          let checkedTopValue = checkValueIncludesTerm(values, searchTerm, o); //CANNOT SUPPORT HTTP://
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
    } else if (typeof value === "number") {
      return value.toString();
    } else {
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
  }
  catch (Error) {
    // return "Please search something more refined.";
  }
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

module.exports = GetDataHelper;