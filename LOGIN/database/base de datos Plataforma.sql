drop database if exists Plataforma;
Create database Plataforma;
use Plataforma;

CREATE TABLE usuarios(
id INT unique AUTO_INCREMENT,
usuarioo VARCHAR(10),
contrasenia VARCHAR(10),
rol VARCHAR(10),
PRIMARY KEY (id));

CREATE TABLE Alumno(
DNI_alumno int NOT NULL,
nombre_alumno varchar (15),
apellido_alumno varchar (15),
contenidos varchar (300),
id INT,
Primary key(DNI_alumno),
FOREIGN KEY (id) REFERENCES usuarios (id));

CREATE TABLE Profesor(
DNI int NOT NULL,
nombre varchar (20),
apellido varchar (20),
id INT,
Primary key (DNI),
FOREIGN KEY (id) REFERENCES usuarios (id)
);

CREATE TABLE curso(
cod_curso INT NOT NULL,
año INT,
division varchar (1),
DNI_alumno INT,
Primary key (cod_curso),
Foreign Key (DNI_alumno) REFERENCES alumno(DNI_alumno));


CREATE TABLE materia(
cod_materia VARCHAR (25) NOT NULL,
nombre varchar (25),
cursos INT,
Primary key (cod_materia),
Foreign Key (cursos) REFERENCES Curso(cod_curso));

CREATE TABLE Nota(
materiia VARCHAR (25),
alumnoo INT,       
numero INT,
Foreign key (materiia) REFERENCES Materia (cod_materia),
Foreign key(alumnoo)REFERENCES Alumno(DNI_alumno));

CREATE TABLE Profe_materia(
profeXmateria INT,
materias VARCHAR (25),
foreign key (profeXmateria) REFERENCES Profesor (DNI),
foreign key (materias) REFERENCES materia (cod_materia));

INSERT INTO usuarios (usuarioo, contrasenia, rol) VALUES 
("LUD", "12345", "admin"),
("ANA", "54321", "alumno"),
("LUDMI", "121103", "alumno");

INSERT INTO alumno (DNI_alumno, nombre_alumno, apellido_alumno, contenidos, id) VALUES 
(46453515, "Ana Luz", "Bazan", "Debe: Proyecto de CNC", 2),
(98765432, "Anahi Ludmila", "Noriega", "Sin comentarios", 3);


INSERT INTO profesor (DNI, nombre, apellido, id) VALUES 
(45485190, "Ludmila Anahí", "Noriega", 1);

INSERT INTO curso (cod_curso, año, division, DNI_alumno) VALUES 
(7, 7, "A", 46453515),
(6, 6, "A", 98765432);

INSERT INTO materia (cod_materia, nombre, cursos) VALUES 
("PROGRAMACION","Programación", 7);

INSERT INTO nota (materiia, alumnoo, numero) VALUES 
("PROGRAMACION", 46453515, 9);

INSERT INTO profe_materia VALUES (45485190, "PROGRAMACION");