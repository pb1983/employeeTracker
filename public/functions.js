const mysql = require('mysql2');
const db = require('../server')



const departmentChoices = async () => {
    try {
        const departments = await new Promise((resolve, reject) => {
            db.query('SELECT name FROM department', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        console.log(departments);
        return departments[0];
    } catch (err) {
        console.log(err.message);
    }
};

departmentChoices()


module.exports = departmentChoices