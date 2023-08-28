import inquirer from "inquirer";
import fs from "fs/promises";
import pkg from '../server.js'
const db = pkg;




let mainMenu = await inquirer 
    
    .prompt([
    
    
    {type: 'list',
    name: 'option_choice',
    message: 'Hello. Please select an option:',
    choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Quit']
}

])


if (mainMenu.option_choice === "View departments") {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
       
    });
    
} else if (mainMenu.option_choice  === "View roles") {
    const mysql = `select role.id, role.title, role.salary, name as department_name from department inner join role
    on department.id = role.department_id`
    db.query(mysql, function (err, results) {
        console.table(results);
       
    });
    
}  else if (mainMenu.option_choice  === "View employees") {
    const mysql = `select employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, employee.manager_id as manager from employee inner join role 
    on employee.role_id = role.id inner join department on department.id = role.department_id order by employee.id`
    db.query(mysql, function (err, results) {
        console.table(results);
        
    });

}   else if (mainMenu.option_choice === "Add a department") {
    let addDept = await inquirer 
    .prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'Please provide a name for the new department'
        }
    ])

    const sql = `INSERT INTO department (name) VALUES ('${addDept.department}')`;

    db.query(sql, function (err, results) {
        console.log(`Added ${addDept.department} to the database`);
    });

} else if (mainMenu.option_choice === "Add a role") {
    let addRole = await inquirer 
    .prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'Please create a title for the new role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please add the salary for the new role'
        },
        
    ])

    const sql = `INSERT INTO department (role) VALUES ('${addRole.title}', '${addRole.salary}')`;

    db.query(sql, function (err, results) {
        console.log(`Added new role '${addRole.title}' with salary of '${addRole.salary}' to the database`);
    });
}






