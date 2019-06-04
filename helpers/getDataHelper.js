const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {}

  getAll(term, filterByTerm, arrayKeyEntered) {
    const organisations = filterByValue(Organisations, term);
    const tickets = filterByValue(Tickets, term);
    const users = filterByValue(Users, term);
    let response = this.allOrganisationDataResult(organisations, tickets, users, term, filterByTerm);
          console.log('response org>>>', response)
          return response;
    // const finalResult = this.resultBasedOnFilter(organisations, tickets, users, filterByTerm, term);
    // return finalResult;
  }

  allOrganisationDataResult(orgs, tickets, users, searchTerm) {
    const orgsResult = this.getDataBasedOnOrgId(orgs, searchTerm);
    const ticketsResult = this.getDataBasedOnOrgId(tickets, searchTerm);
    const usersResult = this.getDataBasedOnOrgId(users, searchTerm);
    const arrayOfEverything = [orgsResult, ticketsResult, usersResult];
    return arrayOfEverything;
  }

  getDataBasedOnOrgId(array, searchTerm) {
    let values = array.map(k => {
      console.log("k>>>", Object.keys(k));
      let idIsString = checkTypeOfItem(k[searchTerm]);
      let orgsWithId = checkValueIncludesTerm(idIsString, searchTerm, k);
      console.log('>orgsWithId>>', orgsWithId)
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
  console.log('>valueInArray>>', valueInArray.toLowerCase())
  if (valueInArray.toLowerCase().includes(searchTerm.toLowerCase())) {
    return parentObject;
  }
  // else {
  //   console.log("in here>>>"); //TODO MIGHT NEED TO ADD SOMETHING HERE
  // }
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

module.exports = GetDataHelper;
