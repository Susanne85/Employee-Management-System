const mysql = require('mysql');

async function viewAllEmployees(connection) {
    try {
        const result = await connection.query("SELECT id as 'Employee ID', firstName as 'First Name', lastName as 'Surname', roleId as 'Role ID', managerId as 'Manager ID' FROM employee");
        // Get the object values from the first element in the result array
        let allEmployees = Object.values(result[0]);
        console.log('\nEmployee Table\n');
        console.table(allEmployees);
    } catch (error) {
        console.log('Error in viewEmployee reading EMPLOYEE table error is ', error);
    }
}
module.exports = viewAllEmployees;