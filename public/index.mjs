import inquirer from "inquirer"
import pkg from '../server.js'
const db = pkg;


//Activates prompt that will persist until user is finished with all tasks. 

async function prompt() {

    
    let mainMenu = await inquirer

    //Main Menu. Options will loop up until user selects 'Quit'.

        .prompt([


            {
                type: 'list',
                name: 'option_choice',
                message: 'Hello. Please select an option:',
                choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
            }

        ])

        //Pulls department table data from mySQL database.

    if (mainMenu.option_choice === "View departments") {
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            prompt()

        });

        //Pulls role table data from mySQL database.

    } else if (mainMenu.option_choice === "View roles") {
        const mysql = `select role.id, role.title, role.salary, name as department_name from department inner join role
        on department.id = role.department_id`
        db.query(mysql, function (err, results) {
            console.table(results);
            prompt()
        });

        //Pulls employee table data from mySQL database.

    } else if (mainMenu.option_choice === "View employees") {
        const mysql = `select employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, employee.manager_id as manager from employee inner join role 
        on employee.role_id = role.id inner join department on department.id = role.department_id order by employee.id`
        db.query(mysql, function (err, results) {
            console.table(results);
            prompt()
        });

        //Takes user input an adds a new department to 'department' table.

    } else if (mainMenu.option_choice === "Add a department") {
        let addDept = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'Please provide a name for the new department'
                }
            ])

        const mysql = `INSERT INTO department (name) VALUES (?)`
        const params = addDept.department;

        db.query(mysql, params, (err, results) => {
            console.log(`New department has been added`);
            prompt()
        });

        //Takes user input an adds a new role to 'role' table.

    } else if (mainMenu.option_choice === "Add a role") {
        let addRole = await inquirer
            .prompt([
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
                {
                    type: 'list',
                    name: 'department_name',
                    message: 'Please choose a department',
                    choices: [{ name: "Operations", value: 1 }, { name: "Accounting", value: 2 }, { name: "Legal", value: 3 }, { name: "Marketing", value: 4 }]
                }

            ])

        const mysql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        const params = [addRole.title, addRole.salary, addRole.department_name];

        db.query(mysql, params, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`New role has been added`);
                prompt()
            }
        });

        //Takes user input an adds a new employee to 'employee' table.

    } else if (mainMenu.option_choice === "Add an employee") {
        let addEmployee = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Please provide employee's first name"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Please provide employee's last name"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select a role',
                    choices: [{ name: "Operations Manager", value: 1 }, { name: "Engineer", value: 2 }, { name: "Accounting Manager", value: 3 }, { name: "Accountant", value: 4 }, { name: "Managing Partner", value: 5 }, { name: "Lawyer", value: 6 }, { name: "Marketing Manager", value: 7 }, { name: "Sales", value: 8 }, { name: "Communications", value: 9 }]
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Please select the employee's manager",
                    choices: [{ name: "Walton Goggins", value: 1 }, { name: "Edie Falco", value: 2 }, { name: "Nathan Fielder", value: 3 }, { name: "Dolly Parton", value: 4 }]
                }
            ])

        const mysql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        const params = [addEmployee.first_name, addEmployee.last_name, addEmployee.role, addEmployee.manager];

        db.query(mysql, params, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`New employee has been added`);
            }
            prompt()
        });

        //Changes existing role of employee.

    } else if (mainMenu.option_choice === "Update an employee role") {
        let update = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Please select and employee',
                    choices: [{ name: "Walton Goggins", value: 1 },{ name: "Edie Falco", value: 2 },{ name: "Nathan Fielder", value: 3 },{ name: "Dolly Parton", value: 4},{ name: "Shiela Escovedo", value: 5 }, { name: "Daniel Kaluuya", value: 6 }, { name: "Alex Murphy", value: 7 }, { name: "Patti Harrison", value: 8 }, { name: "John Goodman", value: 9 }, { name: "Trent Reznor", value: 10 }, { name: "Jeremy White", value: 11 }, { name: "Ayo Edebiri", value: 12 }, { name: "William Friedkin", value: 13 }, { name: "Taika Waititi", value: 14 }]
                }
                ,
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select a role',
                    choices: [{ name: "Operations Manager", value: 1 }, { name: "Engineer", value: 2 }, { name: "Accounting Manager", value: 3 }, { name: "Accountant", value: 4 }, { name: "Managing Partner", value: 5 }, { name: "Lawyer", value: 6 }, { name: "Marketing Manager", value: 7 }, { name: "Sales", value: 8 }, { name: "Communications", value: 9 }]
                }
            ])

        const mysql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [update.role, update.employee];

        db.query(mysql, params, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`employee role has been updated`);
            }
            prompt()
        });

        //Terminates prompt and sends user back to terminal. 

    } else if (mainMenu.option_choice === "Quit") {
        console.log("Goodbye.")
        process.exit(0);
    }

}

prompt()