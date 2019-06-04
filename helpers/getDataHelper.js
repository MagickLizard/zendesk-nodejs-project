const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {}

  getAll(term, filterByTerm) {
    const organisations = filterByValue(Organisations, term);
    const tickets = filterByValue(Tickets, term);
    const users = filterByValue(Users, term);
    const finalResult = this.resultBasedOnFilter(organisations, tickets, users, filterByTerm, term);
    return finalResult;
  }
  resultBasedOnFilter(organisationsResults, TicketsResults, UsersResults, filterByTerm, term) {
    console.log('filterByTerm>>>', filterByTerm)
    console.log('>searchTerm>>', term)
    
    
    let values = (filterByTerm).map((k) => {
      console.log('k>>>', typeof k)
      
      if (k === 'all') {
        let arrayOfEverything = {organisationsResults, TicketsResults, UsersResults};
        return arrayOfEverything;
      }
      else {
        console.log('k ELSE SSS>>>', k)
        let response = this.allOrganisationDataResult(organisationsResults, TicketsResults, UsersResults, term);
        console.log('response org>>>', response)
        return response;
      }
    })
    console.log('>values>>', values)
    return values;
  }

  allOrganisationDataResult(orgs, tickets, users, searchTerm) {
    const orgsResult = this.getDataBasedOnOrgId(orgs, searchTerm, "_id");
    const ticketsResult = this.getDataBasedOnOrgId(tickets, searchTerm,'organization_id');
    const usersResult = this.getDataBasedOnOrgId(users, searchTerm,'organization_id');
    const arrayOfEverything = [orgsResult, ticketsResult, usersResult];
    return arrayOfEverything;
  }

  getDataBasedOnOrgId(array, searchTerm, idReference) {
    let values = array.map(k => {
      console.log("k>>>", Object.keys(k));
      let idIsString = checkTypeOfItem(k[idReference]);
      let orgsWithId = checkValueIncludesTerm(idIsString, searchTerm, k);
      return orgsWithId;
    });
    let uniqueArray = values.filter((item, pos) => values.indexOf(item) == pos);
    const removingBadValues = uniqueArray.filter(i => i);
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
