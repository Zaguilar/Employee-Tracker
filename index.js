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
  microManage();
});


async function microManage(){
    console.log("It's time to micro-manage!")
   await inquirer.prompt(
        [
            {
                name: "choice",
                type: "list",
                message: "Where do you want to go?",
                choices: [
                    "Add department",
                    "View department",
                    "Add role",
                    "View roles",
                    "Add employee",
                    "View employees",
                    "Update roles",
                    "Exit"
                ]
            }
        
        ])};