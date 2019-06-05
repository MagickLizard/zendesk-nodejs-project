const GetDataHelper = require("./helpers/getDataHelper");
const GetUsersFiltersHelper = require("./helpers/getUsersFiltersHelper");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const prettyjson = require('prettyjson');

const initalBanner = () => {
  console.log(
    chalk.magenta(
      figlet.textSync("Search Challenge", {
        font: "big",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
  console.log(
    chalk.magenta("This a command based tool for searching across json data.")
  );
};

const askQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "filters",
      message: "Would you like to filter by:",
      choices: ["All", "Organisations", "Users", "Tickets"],
      filter: function(choice) {
        const getUsersFiltersHelper = new GetUsersFiltersHelper();
        if (choice.toLowerCase().includes("all")) {
          return choice.toLowerCase();
        } else if (choice.toLowerCase().includes("organisation")) {
          const organisationResults = getUsersFiltersHelper.getAllFilters();
          return {organisations: organisationResults.organisations};
        } else if (choice.toLowerCase().includes("tickets")) {
          const ticketResults = getUsersFiltersHelper.getAllFilters();
          return {tickets: ticketResults.tickets};
        } else if (choice.toLowerCase().includes("users")) {
          const userResults = getUsersFiltersHelper.getAllFilters();
          return {users: userResults.users};
        }
        return choice.toLowerCase();
      }
    }
  ];
  return inquirer.prompt(questions);
};
const askQuestionSecond = filters => {
  const questions = [
    {
      type: "list",
      name: "child_keys",
      message: "Would you like to filter by:",
      choices: filters,
      filter: function(val) {
        return val;
      }
    }
  ];
  return inquirer.prompt(questions);
};
const searchOnInput = (child_key, filters) => {
  const questions = [
    {
      name: "word",
      type: +"input",
      message:
        "Please type into the command what you would like to search and press enter.",
      validate: function validateWord(word) {
        const expression = /^[A-Za-z0-9]+$/g;
        const regex = new RegExp(expression);
        if(word === ""){
          const getDataHelper = new GetDataHelper();
          const results = getDataHelper.getAll(word, child_key, filters);
          console.log(chalk.magenta(prettyjson.render(results)));
        }
        if(word.match(regex) !== null) {
        const getDataHelper = new GetDataHelper();
        if(child_key === 'all') {
          const results = getDataHelper.getAll(word, child_key, filters);
           console.log(chalk.magenta(prettyjson.render(results)));
        }
        else {
          const results = getDataHelper.resultBasedOnFilter(word, child_key, filters);
          console.log(chalk.magenta(prettyjson.render(results)));
        }
      }
        else {
          console.log(
            chalk.magenta("A issue occured with this search.")
          );
        }
    
      }
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  initalBanner();
  const answers = await askQuestions();
  const {filters} = answers;

  if (filters == "all") {
    const searchBasedOnId = await searchOnInput(filters, filters);
    return searchBasedOnId;
  }
  else if (filters.organisations) {
    const answersSecond = await askQuestionSecond(filters.organisations);
    const {child_keys} = answersSecond;
    return await searchOnInput(child_keys, filters);
  }
  else if (filters.tickets) {
    const answersSecond = await askQuestionSecond(filters.tickets);
    const {child_keys} = answersSecond;
    return await searchOnInput(child_keys, filters);
  }
  else if (filters.users) {
    const answersSecond = await askQuestionSecond(filters.users);
    const {child_keys} = answersSecond;
    return await searchOnInput(child_keys, filters);
  }
  else {
    return console.log(
      chalk.magenta("A issue occured with this search.")
    );
  }
};

run();
