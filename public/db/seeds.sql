INSERT INTO department (name)
VALUES ("Operations"),
       ("Accounting"),
       ("Legal"),
       ("Marketing")
;

INSERT INTO role (title, salary, department_id)
VALUES ("Operations Manager", 100000, 1),
	   ("Engineer", 70000, 1),
	   ("Accounting Manager", 100000, 2),
	   ("Accountant", 80000, 2),
	   ("Managing Partner", 100000, 3),
	   ("Lawyer", 90000, 3),
	   ("Marketing Manager", 100000, 4),
	   ("Sales", 70000, 4),
	   ("Communications", 70000, 4)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Walton", "Goggins", 1, NULL),
	   ("Edie", "Falco", 3, NULL),
	   ("Nathan", "Fielder", 5, NULL),
	   ("Dolly", "Parton", 7, NULL),
	   ("Shiela", "Escovedo", 2, 1),
	   ("Daniel", "Kaluuya", 2, 1),
	   ("Alex", "Murphy", 2, 1),
	   ("Patti", "Harrison", 2, 1),
	   ("John", "Goodman", 4, 2),
	   ("Trent", "Reznor", 6, 3),
	   ("Jeremy", "White", 8, 4),
	   ("Ayo", "Edebiri", 8, 4),
	   ("William", "Friedkin", 8, 4),
	   ("Taika", "Waititi", 9, 4),
	   ("Wendy", "Peffercorn", 9, 4)
 ;