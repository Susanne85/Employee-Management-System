const mysql = require('mysql');
const inquirer = require('inquirer');
const getConnection = require("./get-connection");

const Questions = require('./lib/questions');
const removeEmployee = require('./lib/removeEmployee.js');
 
async function updateEmployeeRole(connection) {
    try {
        const result = await connection.query("SELECT * FROM employee",);
        // convert the first element in the result array
        let allEmployees = Object.values(JSON.parse(JSON.stringify(result[0])));
        let employeeId = [];
        let employeeRoleId = [];
        let employeeList = [];

        for (i = 0; i < allEmployees.length; i++) {
            employeeId.push(allEmployees[i].id);
            employeeRoleId.push(allEmployees[i].roleId);
            employeeList.push(allEmployees[i].firstName + ' ' + allEmployees[i].lastName);
        };

        const updateEmployeeAnswers = await inquirer.prompt(
            {
                type: "list",
                message: "Which employee do you want to update the role for",
                name: "name",
                choices: employeeList
            }
        );

        let index = employeeList.indexOf(updateEmployeeAnswers.name);

        try {
            const result = await connection.query('SELECT * FROM role');

            let allRoles = Object.values(JSON.parse(JSON.stringify(result[0])));

            const roleTitles = allRoles.map(qs => qs.title);

            let messageText = "Which new role do you want for " + updateEmployeeAnswers.name;

            const updateRoleAnswers = await inquirer.prompt(
                {
                    type: "list",
                    message: messageText,
                    name: "title",
                    choices: roleTitles
                }
            );

            let roleId = allRoles.find(roleItem => roleItem.title === updateRoleAnswers.title);

            try {
                const result = await connection.query(
                    'UPDATE employee SET roleId=? WHERE id=?', [roleId.id, employeeId[index]]
                );

                mainMenu();

            } catch (error) {
                console.log('Error in updateEmployeeRole updating Role in EMPLOYEE table, error is ', error);
            }
        } catch (error) {
            console.log('Error in updateEmployeeRole reading Role in ROLE table, error is ', error);
        }
    } catch (error) {
        console.log('Error in updateEmployeeRole reading EMPLOYEE table, error is ', error);
    }
}
async function addEmployee(connection) {
    try {
        const result = await connection.query("SELECT * FROM role",);
        // convert the first element in the result array
        let allRoles = Object.values(JSON.parse(JSON.stringify(result[0])));
        const roleTitles = allRoles.map(qs => qs.title);
        try {
            const result = await connection.query("SELECT * FROM manager");
            let allManagers = Object.values(JSON.parse(JSON.stringify(result[0])));

            let managerList = allManagers.map(qs => qs.name);
            managerList.push('None', 'New Manager');
            const employeeQuestions = Questions.employeeQuestions.concat(
                {
                    type: "list",
                    message: "What is the Employee's role",
                    name: "title",
                    choices: roleTitles
                },
                {
                    type: "list",
                    name: "name",
                    choices: managerList
                }
            )

            const employeeAnswers = await inquirer.prompt(employeeQuestions);

            let roleId = allRoles.find(roleItem => roleItem.title === employeeAnswers.title);
            let managerId = null;

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

            try {
                connection.query(
                    'INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?,?,?,?)',
                    [employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId]);

                mainMenu();

            } catch (error) {
                console.log('Error in addEmployee updating EMPLOYEE table, error is ', error);
            }
        } catch (error) {
            console.log('Error in addEmployee reading MANAGER table error is ', error);
        }
    } catch (error) {
        console.log('Error in addEmployee reading ROLE table, error is ', error);
    }
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
            removeEmployee(connection);
            console.log("Switching to Remove an Employee");
            break;
        case "Update Employee Role":
            updateEmployeeRole(connection);
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

async function main() {
    const connection = await getConnection();
    mainMenu(connection)
}

main();
