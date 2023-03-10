# 12-cms-trackers


## Employee Management System
This command-line application is designed to manage employee data, including departments, roles, and employees. The application allows users to view, add, and update data within the database.

## Usage
To use this application, simply run the following command in your terminal:

node index.js


This will present you with a list of options to choose from:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Viewing Data
Choosing any of the "view" options will display a formatted table of data from the database. For example, selecting "View all departments" will show a table of department names and IDs.

## Adding Data
Selecting any of the "add" options will prompt the user to enter information for the new data to be added to the database. For example, selecting "Add a department" will prompt the user to enter the name of the new department.

## Updating Data
Choosing the "Update an employee role" option will prompt the user to select an employee to update and then select their new role. The employee's role will then be updated in the database.

## Installation
To install this application, follow these steps:

-Clone the repository to your local machine
-Run npm install to install the necessary dependencies
-Create a .env file to store your database credentials, following the example in the .env.example file
-Run the schema.sql file in your MySQL Workbench or other SQL client to create the necessary database and tables
-Seed the database with the seed.sql
-Run node index.js to start the application



## Technologies Used
This application was built using Node.js, MySQL, and the following Node.js packages:

Inquirer: used to prompt the user for input
MySQL2: used to interact with the MySQL database
Console.table: used to display formatted tables in the console