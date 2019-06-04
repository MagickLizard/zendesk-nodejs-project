const GetDataHelper = require("./helpers/getDataHelper");
const GetUsersFiltersHelper = require("./helpers/getUsersFiltersHelper");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const ora = "ora";
let arrayFilterLevelOne = [];
let arrayFilterLevelTwo = {};
const getUsersFiltersHelper = new GetUsersFiltersHelper();

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
      name: "size",
      message: "Would you like to filter by:",
      choices: ["All", "Organisation", "Users", "Tickets"],
      filter: function(val) {
        arrayFilterLevelOne.push(val.toLowerCase());
        return val.toLowerCase();
      }
    },
    {
      type: "rawlist",
      name: "size",
      message: "Would you like to filter by name, id etc? Yes or No",
      choices: ["Yes", "No"],
      filter: function(val) {
        if (val.toLowerCase().includes("yes")) {
          const response = getUsersFiltersHelper.resultBasedOnFilter(arrayFilterLevelOne);
          arrayFilterLevelTwo = (response);
          return (chalk.yellow(
            'Options to enter are:' +
            chalk.blue.underline.bold(response.toString())
          ));
        } else {
          return chalk.green(`Don't worry you will still be able search :0`);
        }
      }
    },
    {
      name: "word",
      type: +"input",
      message:
        "Please type into the KEY that you would like to search by (and enter key).",
      validate: function validateWord(word) {
        console.log('arrayFilterLevelTwo>>>', arrayFilterLevelTwo.includes(word))
          return word;
      }
    },
    {
      name: "word",
      type: +"input",
      message:
        "Please type into the command what you would like to search (and enter key).",
      validate: function validateWord(word) {
        console.log("what is word>>", word);
        // return word;
        // return results;
          
        const getDataHelper = new GetDataHelper();
        if(arrayFilterLevelTwo.includes(word)) {
          const results = getDataHelper.getAll(arrayFilterLevelTwo, arrayKeyEntered, word);
          console.log('>>response in else>', results)
        }
        else {
          const results = getDataHelper.getAll(arrayFilterLevelTwo, arrayKeyEntered, 'all');
          console.log('>>response in else>', results)
          return results;
        }
        // const keysOfFilter = getDataHelper.resultBasedOnFilter(word, arrayFilter);
        // console.log('>>keysOfFilter>', keysOfFilter)
        // const filterList = getUsersFiltersHelper.resultBasedOnFilter(arrayFilter);
        const getDataHelper = new GetDataHelper();
        const results = getDataHelper.getAll(word, arrayFilterLevelOne);
        console.log('>>response>', results)
        return results;


      }
    },
    {
      name: "word",
      type: +"input",
      message:
        "Please type into the command what you would like to search and press enter.",
      validate: function validateWord(word) {
        console.log("what is word>>", word);
        // return word;
        // return results;

        // const keysOfFilter = getDataHelper.resultBasedOnFilter(word, arrayFilter);
        // console.log('>>keysOfFilter>', keysOfFilter)
        const getDataHelper = new GetDataHelper();
        const results = getDataHelper.getAll(word, arrayFilter);
        console.log('>>response>', results)
        return results;

        // const expression = /^[A-Za-z]+$/g;
        // const regex = new RegExp(expression);
        // // setTimeout(() => {
        // //   const spinner = ora().start();
        // //   spinner.color = "yellow";
        // //   spinner.text = "Loading rainbows";
        // // }, 20);
        // return word.match(regex) !== null;

      }
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  // show script introduction
  initalBanner();

  // ask questions
  const answers = await askQuestions();
  const {list, rawlist} = answers;
  // const answersList = await askQuestions()

  console.log(
    chalk.green(
      `The word ${rawlist} occured ${list} time(s) at the destination URL.`
    )
  );
};

run();
