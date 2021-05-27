const mysql = require('mysql');
const inquirer = require('inquirer');
const getConnection = require("./get-connection");

const Questions = require('./lib/questions');
const removeEmployee = require('./lib/removeEmployee.js');
const e = require('express');

async function addEmployee(connection) {
    try {
        const result = await connection.query("SELECT * FROM role",);
        // convert the first element in the result array
        let allRoles = Object.values(JSON.parse(JSON.stringify(result[0])));
        //console.log("Roles", allRoles);
        const roleTitles = allRoles.map(qs => qs.title);
        try {
            const result = await connection.query("SELECT * FROM manager");
            let allManagers = Object.values(JSON.parse(JSON.stringify(result[0])));

            let managerList = allManagers.map(qs => qs.name);
            managerList.push('None', 'New Manager');
            //console.log('Manager List ', managerList);
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
            //Get the list of role titles from roles table;

            const employeeAnswers = await inquirer.prompt(employeeQuestions);

            //Find the role in the roles table and get the ID 
            //From allRoles, get the id from the Role table and make this a foreign key in the employee table
            //Using the department_ID from the role table get the managers ID from the department table
            //Update the employee table  with firstname, lastname and roleID

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

            //console.log("Update database with ", employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId);
            try {
                connection.query(
                    'INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?,?,?,?)',
                    [employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId]);
                mainMenu();
            } catch {
                console.log('Error updating EMPLOYEE table, error is ', error);
            }

        } catch (error) {
            console.log('Error reading MANAGER table error is ', error);
        }
    } catch (error) {
        console.log('Error reading ROLE table, error is ', error);
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
