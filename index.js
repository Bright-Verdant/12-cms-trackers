

// // const cTable = require('console.table');
// // tests console.table
// // console.table([
//     {
//       name: 'test name',
//       age: 1234
//     }, {
//       name: 'test name 2',
//       age: 5678
//     }
//   ]);
// //   mysql
// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'my_db'
// });

// connection.connect();

// // Query the department table and format the results as a table
// connection.query('SELECT * FROM department', (error, results) => {
//   if (error) throw error;
//   console.table(results);
// });

// connection.end();



// 

const inquirer = require('inquirer');
const mysql = require('mysql2');

const fs = require('fs');

require('dotenv').config(); // load environment variables from .env file

// Create a connection to the MySQL database



const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});







// // read the SQL script from file
// const sqlScript = fs.readFileSync('./schema.sql').toString();

// // execute the SQL script
// connection.query(sqlScript, (error, results) => {
//   if (error) throw error;
//   console.log('Script executed successfully');
// });

// // close the database connection when finished






// Start the application
function startApp() {
  // Display the options to the user
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });
}

// View all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (error, results) => {
    if (error) throw error;
    console.table(results);
    startApp();
  });
}

// View all roles
function viewAllRoles() {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary
               FROM role
               JOIN department ON role.department_id = department.id`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.table(results);
    startApp();
  });
}

// View all employees
function viewAllEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
               FROM employee
               JOIN role ON employee.role_id = role.id
               JOIN department ON role.department_id = department.id
               LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.table(results);
    startApp();
  });
}

// Add a department
function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is the name of the new department?'
  }).then(answer => {
    connection.query('INSERT INTO department SET ?', { name: answer.name }, (error, results) => {
      if (error) throw error;
      console.log(`Department '${answer.name}' added successfully!`);
      startApp();
    });
  });
}










// Add a role
// function addRole() {
  // Get the list of departments for the prompt
  // const departments = [];
  // connection.query('SELECT * FROM department', (error, results) => {
    // if (error) throw error;
    // for (const department of results) {
      // departments.push({ name: department.name, value: department.id });
    // }
    // Prompt the user for the new role details
    // inquirer














    function addRole() {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // prompt user for role info
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "What is the name of the role?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary of the role?",
            },
            {
              name: "department",
              type: "list",
              message: "Which department does the role belong to?",
              choices: function () {
                var choicesArr = [];
                for (var i = 0; i < res.length; i++) {
                  choicesArr.push(res[i].name);
                }
                return choicesArr;
              },
            },
          ])
          .then(function (answer) {
            // get department id based on department name
            var chosenDepartment;
            for (var i = 0; i < res.length; i++) {
              if (res[i].name === answer.department) {
                chosenDepartment = res[i];
                break;
              }
            }
            // insert new role into role table
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title,
                salary: answer.salary,
                department_id: chosenDepartment.id,
              },
              function (err) {
                if (err) throw err;
                console.log("New role added successfully!");
                // return to main menu
                start();
              }
            );
          });
      });
    }
    




    function addEmployee() {
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID?",
          },
          {
            name: "manager_id",
            type: "input",
            message: "What is the employee's manager ID?",
          },
        ])
        .then(function (answer) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id,
            },
            function (err) {
              if (err) throw err;
              console.log("Employee added successfully!");
              start();
            }
          );
        });
    }

    



    function updateEmployeeRole() {
      connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "employee_id",
              type: "list",
              choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push({
                    name: results[i].first_name + " " + results[i].last_name,
                    value: results[i].id,
                  });
                }
                return choiceArray;
              },
              message: "Which employee's role do you want to update?",
            },
            {
              name: "role_id",
              type: "input",
              message: "What is the employee's new role ID?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answer.role_id, answer.employee_id],
              function (err) {
                if (err) throw err;
                console.log("Employee role updated successfully!");
                start();
              }
            );
          });
      });
    }

    



    function start() {
      inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ]
      }).then(function(answer) {
        switch (answer.action) {
          case "View all departments":
            viewDepartments();
            break;
    
          case "View all roles":
            viewRoles();
            break;
    
          case "View all employees":
            viewEmployees();
            break;
    
          case "Add a department":
            addDepartment();
            break;
    
          case "Add a role":
            addRole();
            break;
    
          case "Add an employee":
            addEmployee();
            break;
    
          case "Update an employee role":
            updateEmployeeRole();
            break;
    
          case "Exit":
            connection.end();
            break;
        }
      });
    }
    





startApp();


  