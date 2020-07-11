const mysql = require("mysql");
const inquirer = require("inquirer");

//mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function promptUser(){
    return inquirer.prompt(
        [
            {
                type: "input",
                message: "What is your README title?",
                name: "title"
            },
            {
                type: "input",
                message: "Enter a brief description.",
                name: "description"
            },
            {
                type: "checkbox",
                message: "Enter your table of contents.",
                name: "tableContents",
                choices: ["[Description](#description)",
                 "[Installation](#installation)", 
                 "[Usage](#usage)", 
                 "[License](#license)", 
                 "[Contributing](#contributing)",
                 "[Tests](#tests)",
                 "[Questions](#questions)"]
            },
            {
              type: "input",
              message: "Enter your installation instructions",
              name: "install" 
            },
            {
              type: "input",
              message: "Enter usage information",
              name: "usage"  
            },
            {
                type: "list",
                message: "License?",
                name: "licensing",
                choices: ["[MIT](https://choosealicense.com/licenses/mit/)", "ISC"]
            },
            {
                type: "input",
                message: "Contributing guidelines",
                name: "contribute" 
            },
            {
                type: "input",
                message: "Tests",
                name: "test"
            },
            {
                type: "input",
                message: "What's your Github username?",
                name: "gitHubUrl"
            },
            {
                type: "input",
                message: "What is your Email?",
                name: "email"
            }
        ]
    );
}
