DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR (30),
  PRIMARY KEY (id)
);


CREATE TABLE employeeRole (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30),
  salary INT (30),
  department_id INT (30),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT ,
  firstName VARCHAR (30) NOT NULL,
  lastName VARCHAR (30) NOT NULL,
  role_id INT (30),
  manager_id INT (30),
  PRIMARY KEY (id)
);

INSERT INTO department (department_name) values ("Engineering");
INSERT INTO department (department_name) values ("Finance"); 
INSERT INTO department (department_name) values ("Legal"); 
INSERT INTO department (department_name) values ("Sales"); 

-- INSERT INTO employeeRole(title, salary, department_id)
-- VALUES ("sales", 230000, 3);

INSERT INTO employeeRole (title, salary, department_id) values ("Senior Engineer", 300000, 1);
INSERT INTO employeeRole (title, salary, department_id) values ("Junior Engineer", 150000, 2); 
INSERT INTO employeeRole (title, salary, department_id) values ("Accountant", 200000, 3); 
INSERT INTO employeeRole (title, salary, department_id) values ("Accounting Manager", 250000, 4); 
INSERT INTO employeeRole (title, salary, department_id) values ("Lawyer", 275000, 5);
INSERT INTO employeeRole (title, salary, department_id) values ("Legal Assistant", 150000, 6); 
INSERT INTO employeeRole (title, salary, department_id) values ("Sales Manager", 200000, 7); 
INSERT INTO employeeRole (title, salary, department_id) values ("Salesperson", 150000, 8); 

INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Lance", "Beaver", 8, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Kevin", "Currier", 7, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Jeff", "Judd", 6, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Nancy", "Spratlan", 5, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Cliff", "Spratlan", 4, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Brandon", "Rodriguez", 3, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Alex", "Johnson", 2, 1);
INSERT INTO employee (firstName, lastName, role_id, manager_id) values ("Dunhill", "Cabahat", 1, 1);

SELECT * FROM department;
SELECT * FROM employeeRole;
SELECT * FROM employee;

