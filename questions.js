const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Min3wc0de!",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    doWhat();
});

function doWhat() {
    inquirer
        .prompt({
            name: "what",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a department?",
                "Add a role?",
                "Add an employee?",
                "View a department?",
                "View a role?",
                "View an employee?",
                "Update a department?",
                "Update a role?",
                "Update an employee?"
            ]
        })
        .then(function (answer) {
            switch (answer.what) {
                case "View a department?":
                    viewDepartment();
                    break;

                case "View a role?":
                    viewRole();
                    break;

                case "View an employee?":
                    viewEmployee();
                    break;

                case "Update a department?":
                    updateDepartment();
                    break;

                case "Update a role?":
                    updateRole();
                    break;

                case "Update an employee:":
                    updateEmployee();
                    break;
    
                default:
                    console.log("something went wrong");

                // case "Update an employee:":
                //     updateEmployee();
                //     break;
            }
        })
}
function viewDepartment() {
    connection.query("SELECT department_name FROM department", function (err, res) {
      var department = [];
      for (var i = 0; i < res.length; i++) {
          department[i] = res[i].department_name;
      }
        inquirer
            .prompt({
                name: "departmentS",
                type: "list",
                message: "Choose a department to view?",
                choices: 
                    department
                
            })
            .then(function (answer) {
                console.log(answer);

                // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
                connection.query("SELECT * FROM department WHERE ?", { department_name: answer.departmentS }, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                })
            })
    })

}

function viewRole() {
    inquirer
        .prompt({
            name: "roleS",
            type: "list",
            message: "Choose a role to view?",
            choices: [
                "Senior Engineer",
                "Junior Engineer",
                "Accountant",
                "Accounting Manager",
                "Lawyer",
                "Legal Assistant",
                "Sales Manager",
                "Salesperson"
            ]
        })
        .then(function (answer) {
            console.log(answer);

            // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
            connection.query("SELECT * FROM employeeRole WHERE ?", { title: answer.roleS }, function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        })
}


function viewEmployee() {
    connection.query("SELECT firstName FROM employee" , function(err, res){
        const employee = [];
        for (var i = 0; i < res.length; i++){
            employee[i] = res[i].firstName;
        }
        inquirer
            .prompt({
                name: "employeeS",
                type: "list",
                message: "Choose an employee to view?",
                choices:
                    employee
            })
            .then(function (answer) {
                console.log(answer);
    
                // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
                
                connection.query(`SELECT employee.id, employee.firstName, employee.lastName, employeeRole.title, department.department_name 
                FROM employee, department, employeeRole WHERE employeeRole.id = employee.role_id
                AND department.id = employee.manager_id AND ?`, { firstName: answer.employeeS }, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                })
            })
    })
    
}


function updateDepartment() {
    connection.query("SELECT department_name FROM department", function (err, res) {
        var department = [];
        for (var i = 0; i < res.length; i++) {
            department[i] = res[i].department_name;
        }
          inquirer
              .prompt({
                  name: "departmentS",
                  type: "list",
                  message: "Choose a department to update?",
                  choices: 
                      department
                  
              }).then(function (answer) {
                console.log(answer);
                inquirer
                .prompt({
                    name: "newDepartmentName",
                    type: "input",
                    message: `Department Name: ${answer.departmentS}`
                }).then (function(res){
                    connection.query(`UPDATE department SET department_name = "${res.newDepartmentName}" WHERE department_name = "${answer.departmentS}"`, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                })
                // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
                
                });
            });
        })       
}

function updateRole() {
    connection.query("SELECT title FROM employeeRole", function (err, res) {
        var role = [];
        for (var i = 0; i < res.length; i++) {
            role[i] = res[i].title;
        }
          inquirer
              .prompt({
                  name: "roleS",
                  type: "list",
                  message: "Choose a role to update?",
                  choices: 
                      role
                  
              }).then(function (answer) {
                console.log(answer);
                inquirer
                .prompt({
                    name: "newRole",
                    type: "input",
                    message: `Role: ${answer.roleS}`
                }).then (function(res){
                    connection.query(`UPDATE employeeRole SET title = "${res.newRole}" WHERE title = "${answer.roleS}"`, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                })
                // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
                
                });
            });
        })       
}

function updateEmployee() {
    connection.query("SELECT firstName FROM employee", function (err, res) {
        var employee = [];
        for (var i = 0; i < res.length; i++) {
            employee[i] = res[i].firstName;
        }
          inquirer
              .prompt({
                  name: "employeeS",
                  type: "list",
                  message: "Choose an employee to update?",
                  choices: 
                      employee
                  
              }).then(function (answer) {
                console.log(answer);
                inquirer
                .prompt({
                    name: "newEmployee",
                    type: "input",
                    message: `Employee: ${answer.employeeS}`
                }).then (function(res){
                    connection.query(`UPDATE employee SET firstName = "${res.newEmployee}" WHERE firstName = "${answer.employeeS}"`, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                })
                // let query = "SELECT * FROM department WHERE ?", {department_name: answer.departmentS};
                
                });
            });
        })       
}

        // Add departments, roles, employees

        // Update employee roles





        // function whatDeparment() {
        //     inquirer
        //         .prompt({
        //             name: "department",
        //             type: "input",
        //             message: "What is your deparment name?"
        //         })
        //         .then(function (answer) {
        //             var query = "SELECT position, department_name FROM employeeTracker_db";
        //             connection.query(query, { department: answer.department_name }, function (err, res) {
        //                 for (var i = 0; i < res.length; i++) {
        //                     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        //                 }
        //                 doWhat();
        //             });
        //         });
        //     }

