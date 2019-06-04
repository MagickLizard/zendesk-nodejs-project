const Organisations = require("../api/organizations.json");
const Tickets = require("../api/organizations.json");
const Users = require("../api/organizations.json");

class GetDataHelper {
  constructor() {}

  getAll(term) {
    // console.log("get all>>>", term);
    let checkResult = filterByValue(Organisations, term);
    console.log(">checkResult>>", checkResult);
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
function iterateOverNestedValues(values, searchTerm, parentObject) {
  return Object.keys(values).some(key => {
    if (typeof values[key] === "string") {
      let nestedResult = checkValueIncludesTerm(
        values[key],
        searchTerm,
        parentObject
      );
      if (nestedResult) {
        console.log("nestedResult>>>", typeof nestedResult, nestedResult);
        return nestedResult;
      }
      return values;
    }
  });
  //  const allDataArray = Object.keys(nestedObject).filter((i) => (typeof nestedObject[i] === "string", nestedObject))
  //  console.log('>allDataArray111>>', allDataArray)
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
