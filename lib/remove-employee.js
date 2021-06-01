const mysql = require('mysql');
const inquirer = require('inquirer');
async function removeEmployee(connection) {
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
        
        const removeEmployeeAnswers = await inquirer.prompt(
            {
                type: "list",
                message: "Which employee do you want to remove",
                name: "employeeId",
                choices: employeeList
         
            }
        )
        
        try {
            //console.log('Delete id ', removeEmployeeAnswers.employeeId);
            await connection.query(
                'DELETE FROM employee WHERE id=?', removeEmployeeAnswers.employeeId);
        }catch (error) {
            console.log('Error deleteing from EMPLOYEE table, error is ', error);
        }
    }catch (error) {
        console.log('Error reading EMPLOYEE table, error is ', error);
    }
}

module.exports = removeEmployee;