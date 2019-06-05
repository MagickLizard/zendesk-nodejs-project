const Organisations = require("../api/organizations.json");
const Tickets = require("../api/tickets.json");
const Users = require("../api/users.json");

class GetDataHelper {
  constructor() {}

  getAll(searchTerm, filterByKey, parentSummary) {
    console.log('searchTerm>>>', searchTerm)
    console.log('filterByKey>>>', filterByKey)
    console.log('parentFilter>>>', Object.keys(parentSummary))
    
    
    const organisationsResults = filterByValue(Organisations, searchTerm);
    const TicketsResults = filterByValue(Tickets, searchTerm);
    const UsersResults = filterByValue(Users, searchTerm);

    const finalResult = this.resultBasedOnFilter(organisationsResults, TicketsResults, UsersResults, searchTerm, filterByKey, Object.keys(parentSummary));
    return finalResult;
  }

  resultBasedOnFilter(organisationsResults, TicketsResults, UsersResults, searchTerm, filterByKey, parentSummary) {
    let values = (parentSummary).map((k) => {
      if (k === 'all') {
        let arrayOfEverything = {organisationsResults, TicketsResults, UsersResults};
        return arrayOfEverything;
      }
      if(k === 'organisations') {
        let response = this.allOrganisationDataResult(organisationsResults, searchTerm, filterByKey);
        return response;
      }
      if(k === 'tickets') {
        let response = this.allOrganisationDataResult(TicketsResults, searchTerm, filterByKey);
        return response;
      }
      if(k === 'users') {
        let response = this.allOrganisationDataResult(UsersResults ,searchTerm, filterByKey);
        return response;
      }
    })
    console.log('>values>>', values)
    return values;
  }
  
  allOrganisationDataResult(jsonData, searchTerm, filterByKey) {
    const anyResult = this.getDataBasedOnOrgId(jsonData, searchTerm, filterByKey);
    console.log('anyResult>>>', anyResult);
    return anyResult;
    
    // const ticketsResult = this.getDataBasedOnOrgId(tickets, searchTerm,'organization_id');
    // const usersResult = this.getDataBasedOnOrgId(users, searchTerm,'organization_id');
    // const arrayOfEverything = [orgsResult, ticketsResult, usersResult];
    // return arrayOfEverything;
  }

  getDataBasedOnOrgId(array, searchTerm, idReference) {
    let values = (array).map((k) => {      
      let idIsString = checkTypeOfItem(k[idReference]);
      let orgsWithId = checkValueIncludesTerm(idIsString, searchTerm, k);
      return orgsWithId;
    })
    let uniqueArray = values.filter((item, pos) => values.indexOf(item) == pos)
    const removingBadValues = (uniqueArray).filter((i) =>  i);
    console.log('removingBadValues>>>', removingBadValues)
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