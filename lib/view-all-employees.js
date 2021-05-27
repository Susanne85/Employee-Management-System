const mysql = require('mysql');
const inquirer = require('inquirer');

const cTable = require('console.table');

async function viewAllEmployees(connection) {
    try {
        const result = await connection.query("SELECT * FROM employee",);
        // convert the first element in the result array
        let allEmployees = Object.values(JSON.parse(JSON.stringify(result[0])));

        const table = cTable.getTable(allEmployees);
        console.log('\nEmployee Table\n');
        console.log(table);
        //mainMenu();
    } catch (error) {
        console.log('Error in viewEmployee reading EMPLOYEE table error is ', error);
    }
}
module.exports = viewAllEmployees;