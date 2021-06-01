const mysql = require('mysql');
const inquirer = require('inquirer');
const Questions = require('./questions');
async function addEmployee(connection) {
    try {
        const result = await connection.query("SELECT * FROM roles",);
        // convert the first element in the result array
        let allRoles = Object.values(result[0]);
        const roleTitles = allRoles.map(qs => qs.title);
        try {
            const result = await connection.query("SELECT * FROM employee");
            let allManagers = Object.values(result[0]);

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
                console.log('Answers', employeeAnswers);
            let roleId = allRoles.find(roleItem => roleItem.title === employeeAnswers.title);
            let managerId = null;

            if (employeeAnswers.name !== 'None') {
                let managerFound = allManagers.find(managerItem => managerItem.name === employeeAnswers.name);
                managerId = managerFound.id;
            }

            try {
                //console.log('adding a new new employee', employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId)
                connection.query(
                    'INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?,?,?,?)',
                    [employeeAnswers.firstName, employeeAnswers.lastName, roleId.id, managerId]);
            } catch (error) {
                console.log('Error in addEmployee updating EMPLOYEE table, error is ', error);
            }
        } catch (error) {
            console.log('Error in addEmployee reading EMPLOYEE table error is ', error);
        }
    } catch (error) {
        console.log('Error in addEmployee reading ROLES table, error is ', error);
    }
}

module.exports = addEmployee;