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
    const organisations = filterByValue(Organisations, searchTerm);
    const tickets = filterByValue(Tickets, searchTerm);
    const users = filterByValue(Users, searchTerm);
    return {organisations, tickets, users};

  }

  resultBasedOnFilter(searchTerm, filterByKey, parentSummary) {
      if(parentSummary.organisations) {
        const organisations = this.allOrganisationDataResult(Organisations, searchTerm, filterByKey);
        const tickets = this.allOrganisationDataResult(Tickets, searchTerm, 'organization_id');
        const users = this.allOrganisationDataResult(Users, searchTerm, 'organization_id');
        const response = {organisation: organisations, tickets, users};
        return response;
      }
      if(parentSummary.tickets) {
        const tickets = this.allOrganisationDataResult(Tickets, searchTerm, filterByKey);
        const getOrganisationId = this.getAllInformation(tickets, 'organization_id');
        const users = this.allOrganisationDataResult(Users, getOrganisationId, 'organization_id');
        const organisations = this.allOrganisationDataResult(Organisations, getOrganisationId, '_id');
        const response = {ticket: organisations, tickets, users};
        return response;
      }
      if(parentSummary.users) {
        const users = this.allOrganisationDataResult(Users, searchTerm, filterByKey);
        const getOrganisationId = this.getAllInformation(users, 'organization_id');
        const tickets = this.allOrganisationDataResult(Tickets, getOrganisationId, 'organization_id');
        const organisations = this.allOrganisationDataResult(Organisations, getOrganisationId, '_id');
        const response = {user: organisations, tickets, users};
        return response;
      }

  }
  getAllInformation(array, stringOfKeyWanted) {
    let keyOfField = (array).reduce((previous, current) => {
      if(current[stringOfKeyWanted] ) {
        return current[stringOfKeyWanted] 
      }
      else {
        return ""
      }

    }, {});
    const keyFormatted = checkTypeOfItem(keyOfField);
    return keyFormatted;
  }
  
  allOrganisationDataResult(jsonData, searchTerm, filterByKey) {
    const anyResult = this.getDataBasedOnOrgId(jsonData, searchTerm, filterByKey);
    console.log('anyResult>>>', anyResult);
    return anyResult;
  }

  getDataBasedOnOrgId(array, searchTerm, idReference) {
    let values = (array).map((k) => {

      let idIsString = checkTypeOfItem(k[idReference] || "");
      if(idIsString) {
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
    console.log("Error>>>", Error);
    return Error;
  }
}

function checkValueIncludesTerm(valueInArray, searchTerm, parentObject) {
  try {
    if (valueInArray && valueInArray.toLowerCase().includes(searchTerm.toLowerCase())) {
      return parentObject;
    } 
  }
  catch (Error) {
    console.log("Error>>>", Error);
    return "";
  }
  // else {
  //   // console.log("in here>>>", valueInArray); //TODO MIGHT NEED TO ADD SOMETHING HERE
  //   return "";
  // }
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

module.exports = GetDataHelper;