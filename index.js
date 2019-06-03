// const program = require("commander");
const GetDataHelper = require("./helpers/getDataHelper");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const ora = require("ora");

const initalBanner = () => {
  console.log(
    chalk.magenta(
      figlet.textSync("Hello friend", {
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
const searchBox = () => {
  console.log(
    chalk.green(
      figlet.textSync("-------", {
        font: "small",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "word",
      above: searchBox(),
      type: +"input",
      below: searchBox(),
      message:
        "Please type into the command what you would like to search and press enter.",
      validate: function validateWord(word) {
        console.log("what is word>>", word);
        const getDataHelper = new GetDataHelper();
        const results = getDataHelper.getAll(word);
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
initalBanner();
askQuestions();
