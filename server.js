const express = require('express');
const mysql = require('mysql2');
const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
// db.query('SELECT * FROM role', function (err, results) {
//   console.table(results);
// });


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`\n Server running on port ${PORT}`);
});

module.exports = db