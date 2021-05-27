const mysql = require('mysql');
const inquirer = require('inquirer');
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
            const result = await connection.query('SELECT * FROM roles');

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
                await connection.query(
                    'UPDATE employee SET roleId=? WHERE id=?', [roleId.id, employeeId[index]]);
                //mainMenu();

            } catch (error) {
                console.log('Error in updateEmployeeRole updating Roles in EMPLOYEE table, error is ', error);
            }
        } catch (error) {
            console.log('Error in updateEmployeeRole reading Role in ROLEs table, error is ', error);
        }
    } catch (error) {
        console.log('Error in updateEmployeeRole reading EMPLOYEE table, error is ', error);
    }
}

module.exports = updateEmployeeRole;