DROP DATABASE IF EXISTS employee_management_db;
CREATE DATABASE employee_management_db;
USE employee_management_db;
CREATE TABLE employee_management_db.employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  roleId INTEGER(10) NOT NULL,
  FOREIGN KEY (roleId) REFERENCES ROLES (id),
  managerId INTEGER(10) NULL,
  FOREIGN KEY (managerId) REFERENCES DEPARTMENT(id),
  PRIMARY KEY (id)
);
INSERT INTO
  employee_management_db.employee (firstName, LastName, roleID, managerID)
VALUES
  ("Susanne", "Bilney", 1, 2),
  ("Joe", "Bilney", 2, 1);
INSERT INTO
  employee_management_db.employee (firstName, LastName, roleID)
VALUES
  ("Ann", "Bilney", 2);
INSERT INTO
  employee_management_db.employee (firstName, LastName, roleID,managerID)
VALUES
  ("Marie", "Bilney", 2, null);


SELECT
  *
from
  employee_management_db.employee;
CREATE TABLE employee_management_db.roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INTEGER(50) NOT NULL,
    departmentId INTEGER(10) NOT NULL,
    PRIMARY KEY (id)
  );
INSERT INTO
  employee_management_db.roles (title, salary, departmentId)
VALUES
  ("SalesLead", "50000", 1),("Sales Person", "80000", 1),("Lawyer", "60000", 4);
SELECT
  *
from
  employee_management_db.roles;
CREATE TABLE employee_management_db.department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
  );
INSERT INTO
  employee_management_db.department (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");
SELECT
  *
from
  employee_management_db.department;
  
FROM employee_management_db.employee
LEFT JOIN managers
ON employee_management_db.employee.id = manager.id;

SELECT a.id AS "Emp_ID", a.firstName AS "Employee First Name", a.lastName AS "Employee Surname",
b.id AS "Manager", b.firstName AS "Manager First Name", b.lastName AS "Managers Surname"
FROM employee_management_db.employee a, employee_management_db.employee b
WHERE a.managerId = b.id;

SELECT employee.id AS "Emp_ID", employee.firstName AS "Employee First Name", employee.lastName AS "Employee Surname",
        manager.id AS "Manager", manager.firstName AS "Manager First Name", manager.lastName AS "Managers Surname"
        FROM employee, employee manager
        WHERE employee.managerId = manager.id;