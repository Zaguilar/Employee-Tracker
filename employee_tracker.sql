DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES role(id)
);


INSERT INTO department (name)
VALUES ('Sales');

INSERT INTO department (name)
VALUES ('Engineering');
   
INSERT INTO department (name)
VALUES ('Security');

INSERT INTO role (title, department_id)
VALUES ('Sales', 1 );

INSERT INTO role (title, department_id)
VALUES ('Guard', 3);

INSERT INTO role (title, department_id)
VALUES('Engineer', 2);

INSERT INTO role (title, department_id)
VALUES ('Supervisor', 3);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Brody', 'Jenkins', '1' );
   
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Ricardo', 'Montoya', '2');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Helen', 'Wu', '2');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Vladmir', 'Lomachenko', '3');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Theresa', 'Givens', '3');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Joseph', 'Wallace', '2');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Dianna', 'Gomez', '2');

