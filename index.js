const mysql = require("mysql");
const inquirer = require("inquirer");
//mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pterodactylus!!7",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


async function microManage() {
    console.log("It's time to micro-manage!")
   await inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Where do you want to go?",
             choices: [
             "Add department",
             "View department",
             "Add role",
             "View role",
             "Add employee",
             "View employee",
             "Update role",
             "Exit"
            ]
        })
          .then(function (answer) {
            switch (answer.action){
                case "Add department":
                    addDep();
                    break;
                    
                case "View department":
                    viewDep();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "View role":
                    viewRole();
                    break;

                case "Add employee":
                    addEmp();
                    break;

                case "View employee":
                    viewEmp();
                    break;

                case "Update role":
                    updateRole();
                    break;

                 case "Exit":
                    connection.end();
                    break;
                }
                
            });
        
        }
        async function addDep() {
            await inquirer
                .prompt([
                 {
                  type: "input",
                  name: "department",
                  message: "add department"
                 },
             ])
                .then(function (answer) {
                 connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], function (err, data) {
                  if (err) throw err;
                   console.table("department added");
                 })
             })
                microManage();
              };
    
         function viewDep() {
            connection.query("SELECT * FROM department ", function (err, answer) {
                console.table(answer);
                if (err) throw err;
        });
        microManage();
    }
    async function addRole() {
        await inquirer
          .prompt([
            {
              message: "What is the role?",
              type: "input",
              name: "title"
            },
            {
              message: "enter department id number",
              type: "number",
              name: "department_id"
            }
          ])
          .then(function (answer) {
            connection.query("INSERT INTO role (department_id) values (?)", [ answer.department_id], function (err, data) {
              console.log("added role");
            })
          })
        microManage();
      };
      function viewRole() {
        connection.query("SELECT * FROM role ", 
          function (err, answer) {
            console.table(answer);
          if (err) throw err;
          
        });
        microManage();
    };
    async function addEmp() {
        await inquirer
          .prompt([
            {
              type: "input",
              message: "employee first name",
              name: "firstName"
            },
            {
              type: "input",
              message: "employee last name",
              name: "lastName"
            },
            {
              name: "role",
              type: "list",
              message: "enter employee role",
              choices: [
                "Sales",
                "Engineering",
                "Security"
              ]
            }
          ])
        
        .then(function (answer) {
            var roleNum = answer.role
            switch (answer.role){
                case "Sales":
                    roleNum = 1;
                    break;
                
                case "Engineering":
                    roleNum = 2;
                    break;
                
                case "Security":
                    roleNum = 3;
                
                }
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      first_name: answer.firstName,
                      last_name: answer.lastName,
                      role_id: roleNum,
                    },
                    function (err, answer) {
                      if (err) {
                        throw err;
                      }
                      console.log("added employee");
                    
                    });
                });
            microManage();
        }
        function viewEmp() {
            connection.query("SELECT first_name AS FirstName ,last_name as LastName , role.title as Role, department.name AS Department FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id",
              function (err, answer) {
                console.table(answer);
                if (err) throw err;
          
              });
            microManage();
        }

        function updateRole() {
            inquirer.prompt([
              {
                type: "input",
                message: "employee first name",
                name: "employeeName"
              },
              {
                type: "list",
                message: "What is this employee's new role?",
                name: "role",
                choices: [
                    "Sales",
                    "Engineering",
                    "Security"
                ]}
            ])
              .then(function (answer) {
                var roleNum = answer.role
                switch (answer.role) {
                    case "Sales":
                        roleNum = 1;
                        break;
                    
                    case "Engineering":
                        roleNum = 2;
                        break;
                    
                    case "Security":
                        roleNum = 3;
                }
                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [roleNum, answer.name], 
                    function (err, data) {
                      if (err) throw err;
                      console.log("role updated");
                })
                microManage();
              })
          }
          microManage();
        