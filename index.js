const mysql = require('mysql');
const inquirer = require('inquirer');
const getConnection = require("./get-connection");

const Questions = require('./lib/questions');
const addEmployee = require('./lib/add-employee.js');
const removeEmployee = require('./lib/remove-employee');
const updateEmployeeRole = require('./lib/update-employee-role');
const updateEmployeeManager = require('./lib/update-employee-manager');

const viewAllEmployees = require('./lib/view-all-employees');
const viewEmployeesByManager = require('./lib/view-employees-by-manager');
const viewEmployeesByDepartment = require('./lib/view-employees-by-department.js');

async function mainMenu(connection) {
    const mainMenuAnswers = await inquirer.prompt(Questions.mainMenuQuestions);
    switch (mainMenuAnswers.selection) {
        case "View all Employees":
            await viewAllEmployees(connection);
            mainMenu(connection)
            break;
        case "View all Employees by Deparment":
            await viewEmployeesByDepartment(connection);
            mainMenu(connection);
            break;
        case "View all Employees by Manager":
            await viewEmployeesByManager(connection);
            mainMenu(connection);
            break;
        case "Add an Employee":
            await addEmployee(connection);
            mainMenu(connection);
            break;
        case "Remove an Employee":
            await removeEmployee(connection);
            mainMenu(connection);
            break;
        case "Update Employee Role":
            await updateEmployeeRole(connection);
            mainMenu(connection);
            break;
        case "Update Employee Manager":
            await updateEmployeeManager(connection);
            mainMenu(connection);
            break;
        case "Exit":
            connection.end();
            break;
        default:
            console.log("Nothing switched", mainMenuAnswers.selection);
    }

}
async function main() {
    const connection = await getConnection();
    mainMenu(connection);
}

main();