const Organisations = require("../api/organizations.json");
const Tickets = require("../api/organizations.json");
const Users = require("../api/organizations.json");

class GetDataHelper {
  constructor() {}

  getAll(term) {
    console.log("get all>>>", term);
    let checkResult = filterByValue(Organisations, term);
    console.log(">checkResult>>", checkResult);
    // let flatten = this.flattenOrganisationData(Organisations);
    // console.log("flatten>>>", flatten);
  }

  flattenOrganisationData(Organisations) {
    return Organisations.map(k => {
      let nested = Object.values(k).map(values => {
        if (Array.isArray(values)) {
          let nestedCheck = arrayToObject(values);
          console.log("nestedCheck>>>", nestedCheck);
          return nestedCheck;
        } else {
          return values;
        }
      });
      return nested;
    });
  }
}
function filterByValue(array, string) {
  return array.filter(o => {
    return Object.keys(o).some(k => {
      // console.log("o[k]>>>", typeof o[k], o[k]);
      if (typeof o[k] === "string") {
        if (o[k].toLowerCase().includes(string.toLowerCase())) {
          console.log("o[k]>>>", o[k]);
          return o[k];
        }
      } else if (typeof o[k] === "object") {
        let nestedCheck = arrayToObject(o[k]);
        return Object.keys(nestedCheck).some(k => {
          // console.log("kkk>>>", nestedCheck[k]);
          if (typeof nestedCheck[k] === "string") {
            if (nestedCheck[k].toLowerCase().includes(string.toLowerCase())) {
              console.log("nestedCheck[k]", nestedCheck[k]);
              // return o[k];
              return nestedCheck[k];
            } else {
              console.log("doesnt have value>>>", nestedCheck[k]);
              return [];
            }
          }
        });
      }
      //  else {
      //   o[k].includes(string);
      // }
    });
  });
}
function arrayToObject(array) {
  return Object.assign({}, array);
}

function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}

module.exports = GetDataHelper;
