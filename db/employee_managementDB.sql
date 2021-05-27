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
CREATE TABLE employee_management_db.manager (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
  );
INSERT INTO
  employee_management_db.manager (name)
VALUES
  ("Stephanie Smith"),
  ("Freddy Jones"),
  ("Arthur Smith");
SELECT
  *
from
  employee_management_db.manager;