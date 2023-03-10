const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database with connection ID: ' + connection.threadId);
});

const departments = [
  {
    id: 1,
    name: 'Engineering',
  },
  {
    id: 2,
    name: 'Sales',
  },
  {
    id: 3,
    name: 'Finance',
  },
  {
    id: 4,
    name: 'Human Resources',
  },
];

const roles = [
  {
    id: 1,
    title: 'Software Engineer',
    salary: 100000,
    department_id: 1,
  },
  {
    id: 2,
    title: 'Sales Manager',
    salary: 80000,
    department_id: 2,
  },
  {
    id: 3,
    title: 'Financial Analyst',
    salary: 75000,
    department_id: 3,
  },
  {
    id: 4,
    title: 'HR Manager',
    salary: 70000,
    department_id: 4,
  },
];

const employees = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    role_id: 1,
    manager_id: null,
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    role_id: 2,
    manager_id: 1,
  },
  {
    id: 3,
    first_name: 'Mike',
    last_name: 'Johnson',
    role_id: 3,
    manager_id: 1,
  },
  {
    id: 4,
    first_name: 'Lisa',
    last_name: 'Jackson',
    role_id: 4,
    manager_id: null,
  },
];

connection.query('INSERT INTO department (id, name) VALUES ?', [departments.map(dept => [dept.id, dept.name])], (err, results) => {
  if (err) throw err;
  console.log(`Inserted ${results.affectedRows} rows into department.`);
});

connection.query('INSERT INTO role (id, title, salary, department_id) VALUES ?', [roles.map(role => [role.id, role.title, role.salary, role.department_id])], (err, results) => {
  if (err) throw err;
  console.log(`Inserted ${results.affectedRows} rows into role.`);
});

connection.query('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ?', [employees.map(emp => [emp.id, emp.first_name, emp.last_name, emp.role_id, emp.manager_id])], (err, results) => {
  if (err) throw err;
  console.log(`Inserted ${results.affectedRows} rows into employee.`);
});

connection.end();
