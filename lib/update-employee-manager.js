const mysql = require('mysql');
const inquirer = require('inquirer');
const Questions = require('./questions');
async function updateEmployeeManager(connection) {
    //console.log('updateEmployeeManager');
    try {
        const result = await connection.query("SELECT * FROM employee",);
        // convert the first element in the result array
        let allEmployees = Object.values(result[0]);

        let employeeList = allEmployees.map(employee => {
            return {
                name: employee.firstName + ' ' + employee.lastName,
                value: employee.id,
            }
        });

        const employeeAnswers = await inquirer.prompt(
            {
                type: "list",
                message: "Which Employee's Manager do you want to update?",
                name: "employeeId",
                choices: employeeList
            },
        )

        let employeeFoundIndex = allEmployees.findIndex(index => index.id === employeeAnswers.employeeId);
        let managerList = [];

        for (i=0; i< employeeList.length; i++){
            if (i != employeeFoundIndex) {
                managerList = managerList.concat(employeeList[i]);
            }
        }

        let employeeName = allEmployees[employeeFoundIndex].firstName + ' ' + allEmployees[employeeFoundIndex].lastName;
        let messageText = "Which Employee do you want to act as Manager for " + employeeName;

        const managerAnswers = await inquirer.prompt(
            {
                type: "list",
                message: messageText,
                name: "managerId",
                choices: managerList,
            },
        )

        try {
            //console.log("Update Employee's Manager is " + employeeAnswers.employeeId + 'New Manager is ' + managerAnswers.managerId);
            await connection.query(
                 'UPDATE employee SET managerId=? WHERE id=?', [managerAnswers.managerId, employeeAnswers.employeeId]);

         } catch (error) {
             console.log('Error in updateEmployeeManager updating Manager ID in EMPLOYEE table, error is ', error);
         }
    }catch (error) {
        console.log('Error in updateEmployeeManager reading EMPLOYEE table error is ', error);
    }
}

module.exports = updateEmployeeManager;