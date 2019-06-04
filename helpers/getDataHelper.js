const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {}

  getAll(term, filterByTerm) {
    const getsAllResultsOfOrganisation = filterByValue(Organisations, term);
    const TicketsResults = filterByValue(Tickets, term);
    const UsersResults = filterByValue(Users, term);
    let values = (filterByTerm).map((k) => {
      if (k === 'all') {
        let response = this.allDataResult(getsAllResultsOfOrganisation, TicketsResults, UsersResults);
        console.log('>>response>', response);
      }
      if(k === 'organisation_id') {
        let response = this.allOrganisationDataResult(getsAllResultsOfOrganisation, TicketsResults, UsersResults, term);
        console.log('response org>>>', response)
        return response;
      }
    })
    console.log('>values>>', values)
  }
  allDataResult(orgs, tickets, users) {
    let arrayOfEverything = [orgs, tickets, users];
    return arrayOfEverything;
  }
  allOrganisationDataResult(orgs, tickets, users, searchTerm) {
    const orgsResult = this.getDataBasedOnOrgId(orgs, searchTerm,'_id');
    const ticketsResult = this.getDataBasedOnOrgId(tickets, searchTerm,'organization_id');
    const usersResult = this.getDataBasedOnOrgId(users, searchTerm,'organization_id');
    const arrayOfEverything = [orgsResult, ticketsResult, usersResult];
    return arrayOfEverything;
  }

  getDataBasedOnOrgId(array, searchTerm, idReference) {
    let values = (array).map((k) => {
      let idIsString = checkTypeOfItem(k[idReference]);
      let orgsWithId = checkValueIncludesTerm(idIsString, searchTerm, k);
      return orgsWithId;
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
    } else if (typeof value === "object") {
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
  if (valueInArray.toLowerCase().includes(searchTerm.toLowerCase())) {
    return parentObject;
  } 
  // else {
  //   console.log("in here>>>", valueInArray); //TODO MIGHT NEED TO ADD SOMETHING HERE
  // }
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

module.exports = GetDataHelper;
