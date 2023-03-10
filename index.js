

const cTable = require('console.table');
// tests console.table
console.table([
    {
      name: 'test name',
      age: 1234
    }, {
      name: 'test name 2',
      age: 5678
    }
  ]);
//   mysql
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_db'
});

connection.connect();

// Query the department table and format the results as a table
connection.query('SELECT * FROM department', (error, results) => {
  if (error) throw error;
  console.table(results);
});

connection.end();
