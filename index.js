const GetDataHelper = require("./helpers/getDataHelper");
const GetUsersFiltersHelper = require("./helpers/getUsersFiltersHelper");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const ora = require("ora");
this.options = [""];

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
          let topLevel = getUsersFiltersHelper.getAllFilters(choice);
          console.log(">topLevel>>", topLevel);
          const organisations = {organisations: topLevel.organisations};
          return organisations;
        } else if (choice.toLowerCase().includes("tickets")) {
          let topLevel = getUsersFiltersHelper.getAllFilters(choice);
          const tickets = {tickets: topLevel.tickets};
          return tickets;
        } else if (choice.toLowerCase().includes("users")) {
          let topLevel = getUsersFiltersHelper.getAllFilters(choice);
          const users = {users: topLevel.users};
          return users;
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
        console.log("what is word>>", word);
        const getDataHelper = new GetDataHelper();
        const results = getDataHelper.getAll(word, child_key, filters);
        console.log(">GetDataHelper>>", results);

        const expression = /^[A-Za-z]+$/g;
        const regex = new RegExp(expression);
        // setTimeout(() => {
        //   const spinner = ora().start();
        //   spinner.color = "yellow";
        //   spinner.text = "Loading rainbows";
        // }, 20);
        return word.match(regex) !== null;
      }
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  initalBanner();
  const answers = await askQuestions();
  const {filters} = answers;
  console.log(">filters>>", filters);
  if (filters == "all") {
    const searchBasedOnId = await searchOnInput("all", filters);
    return searchBasedOnId;
  }
  else if (filters.organisations) {
    const answersSecond = await askQuestionSecond(filters.organisations);
    const {child_keys} = answersSecond;
    console.log(">>child_keys>", child_keys);
    const searchBasedOnId = await searchOnInput(child_keys, filters);
    return searchBasedOnId;
  }
  else if (filters.tickets) {
    const answersSecond = await askQuestionSecond(filters.tickets);
    const {child_keys} = answersSecond;
    console.log(">>child_keys>", child_keys);
    const searchBasedOnId = await searchOnInput(child_keys, filters);
    return searchBasedOnId;
  }
  else if (filters.users) {
    const answersSecond = await askQuestionSecond(filters.users);
    const {child_keys} = answersSecond;
    console.log(">>child_keys>", child_keys);
    const searchBasedOnId = await searchOnInput(child_keys, filters);
    return searchBasedOnId;
  }
  else {
    return console.log(
      chalk.magenta("A issue occured with this search.")
    );
  }
};

run();
