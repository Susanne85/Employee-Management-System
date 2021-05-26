const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '2Chiret9?A13',
    database: 'employee_management_db'
});

const Questions = require('./lib/questions.js');

async function addEmployee(connection) {
    connection.query("SELECT * FROM role", async function (error, allRoles) {
        if (error) throw error;
        const roleTitles = allRoles.map(qs => qs.title);
        connection.query("SELECT * FROM manager", async function (error, allManagers) {
            if (error) throw error;
            let managerList = allManagers.map(qs => qs.name);
            managerList.push('None', 'New Manager');
            console.log('Manager List ', managerList);
            const employeeQuestions = Questions.employeeQuestions.concat(
                {
                    type: "list",
                    message: "What is the Employee's role",
                    name: "title",
                    choices: roleTitles
                },
                {
                    type: "list",
                    message: "Who is their manager",
                    name: "name",
                    choices: managerList
                }
            )
            // Get the list of role titles from roles table;

            const employeeAnswers = await inquirer.prompt(employeeQuestions);

            //Find the role in the roles table and get the ID 
            //From allRoles, get the id from the Role table and make this a foreign key in the employee table
            //Using the department_ID from the role table get the managers ID from the department table
            //Update the employee table  with firstname, lastname and roleID
            console.log('got to here'); let roleId = allRoles.find(roleItem => roleItem.title === employeeAnswers.title);
            let managerId ='';

            if (employeeAnswers.name === 'New Manager') {
                // ask another question to get New Managers Name,
                // Update Manager table Get Manager ID
                
                const managerAnswers = await inquirer.prompt(Questions.managerQuestions);
                let managerId = managerAnswers.managerName;
                console.log('New Managers Name', managerAnswers.managerName, managerId);
            }

            if (employeeAnswers.name !== 'None') {
                let managerId = allManagers.find(managerItem => managerItem.name === employeeAnswers.name);
            }

            console.log("Manager Department ID", managerId);

            console.log("Update database with ", employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId.id);

            // connection.query(
            //      'INSERT INTO employee (firstName, lastName, role_id, department_id) VALUES (?,?,?,?)',
            //     [employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, roleId.departmentId],
            //      function (error, results) {
            //          console.log(`${results.affectedRows} employee inserted!\n`);
            //     }
            // );
            mainMenu();
        });
    });

}
async function mainMenu(connection) {
    const questions = Questions.mainMenuQuestions;
    const mainMenuAnswers = await inquirer.prompt(questions)
    switch (mainMenuAnswers.selection) {
        case "View all Employees":
            console.log("Switching to View all Employees");
            break;
        case "View all Employees by Deparment":
            console.log("Switching to View all Employees by Deparment");
            break;
        case "View all Employees by Manager":
            console.log("Switching to View all Employees by Manager");
            break;
        case "Add an Employee":
            console.log("Switching to Add an Employee");
            addEmployee(connection);
            break;
        case "Remove an Employee":
            console.log("Switching to Remove an Employee");
            break;
        case "Update Employee Role":
            console.log("Switching to Update Employee Role");
            break;
        case "Update Emplyee Manager":
            console.log("Switching to Update Emplyee Manager");
            break;
        case "Exit":
            console.log("Switching to Exit");
            //  connection.end();
            break;
        default:
            console.log("Nothing switched", mainMenuAnswers.selection);
    }
}

connection.connect((error) => {
    if (error) throw error;
    console.log(`connected as id ${connection.threadId}`);
    mainMenu(connection);
});