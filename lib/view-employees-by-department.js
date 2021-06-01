const mysql = require('mysql');
async function viewAllEmployeesByDepartment(connection) {
    try {
        const result = await connection.query("SELECT employee.id as 'Employee Id', employee.firstName as 'First Name', employee.lastName as 'Surname', roles.id as 'Role ID', roles.title as 'Title', roles.salary as 'Salary', employee.managerId as 'Manager Id' FROM employee INNER JOIN ROLES on employee.roleId=roles.id");
        let allEmployees = Object.values(result[0]);

        console.log('\nEmployee by Department Table\n');
        console.table(allEmployees);
    } catch (error) {
        console.log('Error in viewAllEmployeesByDepartment, error is ', error);
    }
}
module.exports = viewAllEmployeesByDepartment;