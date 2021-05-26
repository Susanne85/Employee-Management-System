
const checkEmployeeInput = (value) => {
    if (value === ''){
        console.log(`\nEnter text for a name`);
        return false;
    }

    if (value.length < 2) {
        console.log(`\nName must be more than one character`);
        return false;
    }
    return true;
}

const employeeQuestions = [
    {
        type: "input",
        message: "Enter Employee's First Name",
        name: "firstName",
        validate: checkEmployeeInput,
    },
    {
        type: "input",
        message: "Enter Employee's Last Name",
        name: "lastName",
        validate: checkEmployeeInput,
    },
]


const managerQuestions = [
    {
        type: "input",
        message: "Enter Manager's name",
        name: "employeeName",
        validate: checkEmployeeInput,
    },
]

const mainMenuQuestions = [
    {
        type: "list",
        message: "What would you like to do",
        name: "selection",
        choices: ["View all Employees", "View all Employees by Deparment","View all Employees by Manager", "Add an Employee","Remove an Employee","Update Employee Role","Update Employee Manager", "Exit"]
    },
]
// When exporting you are exporting an object what ever you put after the "=" sign

module.exports = {
    employeeQuestions: employeeQuestions,
    managerQuestions: managerQuestions,
    mainMenuQuestions: mainMenuQuestions,
}