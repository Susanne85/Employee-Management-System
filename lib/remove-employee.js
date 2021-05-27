const mysql = require('mysql');
const inquirer = require('inquirer');
async function removeEmployee(connection) {
    try {
        const result = await connection.query("SELECT * FROM employee",);
        // convert the first element in the result array
        let allEmployees = Object.values(JSON.parse(JSON.stringify(result[0])));
        let employeeId = [];
        let employeeList = [];      

        for (i = 0; i < allEmployees.length; i++) {
            employeeId.push(allEmployees[i].id);
            employeeList.push(allEmployees[i].firstName + ' ' + allEmployees[i].lastName);
        };

        const removeEmployeeAnswers = await inquirer.prompt(
            {
                type: "list",
                message: "Which employee do you want to remove",
                name: "name",
                choices: employeeList
            }
        )
        
        let removeIndex = employeeList.indexOf(removeEmployeeAnswers.name);
        let removeEmployeeIndex = employeeId[removeIndex];

        try {
            await connection.query(
                'DELETE FROM employee WHERE id=?', removeEmployeeIndex);
            //mainMenu();
        }catch (error) {
            console.log('Error deleteing from EMPLOYEE table, error is ', error);
        }
    }catch (error) {
        console.log('Error reading EMPLOYEE table, error is ', error);
    }
}

module.exports = removeEmployee;