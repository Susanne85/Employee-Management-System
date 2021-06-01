const mysql = require('mysql');
//const inquirer = require('inquirer');
async function viewEmployeesByManager(connection){
    console.log('viewEmployeesByManage');
    try {
        const result = await connection.query("SELECT employee.id AS 'Employee ID', employee.firstName AS 'Employee First Name', employee.lastName AS 'Employee Surname', manager.id AS 'Manager ID', manager.firstName AS 'Manager First Name', manager.lastName AS 'Managers Surname' FROM employee, employee manager WHERE employee.managerId = manager.id");
       
        let allEmployees = Object.values(result[0]);

        console.log('\nEmployees by Manager Table\n');
        console.table(allEmployees);
    } catch (error) {
        console.log('Error in viewEmployeesByManager, error is ', error);
    }
}

module.exports = viewEmployeesByManager;
