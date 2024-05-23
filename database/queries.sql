CREATE TABLE skaters (
	id SERIAL,
	email VARCHAR(50) NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	password VARCHAR(25) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL
);

SELECT * FROM skaters;


INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado)
VALUES
	('tonyhawk@gmail.com','Tony Hawk', 111111, 12, 'Kickflip', 'tony.jpg', true),
	('evebou@gmail.com','Evelien Bouilliart', 222222, 10, 'Heelflip', 'Evelien.jpg', true),
	('thisistheway@gmail.com','Danny Way', 333333, 8, 'Ollie', 'Danny.jpg', False);