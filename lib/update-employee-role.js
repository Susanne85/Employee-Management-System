const mysql = require('mysql');
const inquirer = require('inquirer');
async function updateEmployeeRole(connection) {
    try {
        const result = await connection.query("SELECT * FROM employee",);
        // Get the object values from the first element in the result array
        let allEmployees = Object.values(result[0]);

        const employeeList = allEmployees.map(employee => {
            return {
                name: employee.firstName + ' ' + employee.lastName ,
                value: employee.id,
            }
        });

        const updateEmployeeAnswers = await inquirer.prompt(
            {
                type: "list",
                message: "Which employee do you want to update the role for",
                name: "employeeId",
                choices: employeeList
            }
        );
        
        let employeeFound = allEmployees.find(index => index.id === updateEmployeeAnswers.employeeId);
        let employeeName = employeeFound.firstName + ' ' + employeeFound.lastName;
        let employeeRoleId = employeeFound.roleId;

        try {
            const result = await connection.query('SELECT * FROM roles');

            let allRoles = Object.values(result[0]);

            const roleTitles = allRoles.map(role => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
 
            let currentRoleFound = allRoles.find(index => index.id === employeeRoleId);
            let messageText = employeeName +"'s current role is " + currentRoleFound.title + ", which new role do you want";

            const updateRoleAnswers = await inquirer.prompt(
                {
                    type: "list",
                    message: messageText,
                    name: "id",
                    choices: roleTitles
                }
            );

            try {
                //console.log('Update Employee is '+ updateEmployeeAnswers.employeeId + 'New Role is ' + updateRoleAnswers.id)
                await connection.query(
                    'UPDATE employee SET roleId=? WHERE id=?', [updateRoleAnswers.id, updateEmployeeAnswers.employeeId]);

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