const mysql = require('mysql');
const inquirer = require('inquirer');
const getConnection = require("./get-connection");

const cTable = require('console.table');
const Questions = require('./lib/questions');
const removeEmployee = require('./lib/remove-employee');
const updateEmployeeRole = require('./lib/update-employee-role');
const viewAllEmployees = require('./lib/view-all-employees');

async function addEmployee(connection) {
    try {
        const result = await connection.query("SELECT * FROM roles",);
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
        console.log('Error in addEmployee reading ROLES table, error is ', error);
    }
}

async function mainMenu(connection) {
    const questions = Questions.mainMenuQuestions;
    const mainMenuAnswers = await inquirer.prompt(questions)
    switch (mainMenuAnswers.selection) {
        case "View all Employees":
            viewAllEmployees(connection);
            break;
        case "View all Employees by Deparment":
            console.log("Switching to View all Employees by Deparment");
            break;
        case "View all Employees by Manager":
            console.log("Switching to View all Employees by Manager");
            break;
        case "Add an Employee":
            addEmployee(connection);
            break;
        case "Remove an Employee":
            removeEmployee(connection);
            break;
        case "Update Employee Role":
            updateEmployeeRole(connection);
            break;
        case "Update Employee Manager":
            console.log("Switching to Update Employee Manager");
            break;
        case "Exit":
            console.log("Switching to Exit");
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
