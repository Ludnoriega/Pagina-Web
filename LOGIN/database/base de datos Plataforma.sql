drop database if exists Plataforma;
Create database Plataforma;
use Plataforma;

CREATE TABLE usuarios(
id INT unique AUTO_INCREMENT,
usuarioo VARCHAR(10),
contrasenia VARCHAR(10),
rol VARCHAR(10),
PRIMARY KEY (id));

CREATE TABLE curso(
cod_curso VARCHAR(5),
año INT,
division varchar (1),
Primary key (cod_curso));

CREATE TABLE Alumno(
DNI_alumno int,
nombre_alumno varchar (15),
apellido_alumno varchar (15),
contenidos varchar (300),
id INT,
ID_CURSO VARCHAR(5),
Primary key(DNI_alumno),
FOREIGN KEY (ID_CURSO) REFERENCES curso(cod_curso),
FOREIGN KEY (id) REFERENCES usuarios (id));

CREATE TABLE Profesor(
DNI int NOT NULL,
nombre varchar (20),
apellido varchar (20),
id INT,
Primary key (DNI),
FOREIGN KEY (id) REFERENCES usuarios (id)
);

CREATE TABLE materia(
cod_materia VARCHAR (25) NOT NULL,
nombre varchar (25),
cursos VARCHAR(5),
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

INSERT INTO curso (cod_curso, año, division) VALUES 
("7A", 7, "A"),
("6A", 6, "A"),
("6B", 6, "B"),
("6C", 6, "C"),
("5A", 5, "A"),
("5B", 5, "B"),
("5C", 5, "C"),
("4A", 4, "A"),
("4B", 4, "B"),
("4C", 4, "C"),
("3A", 3, "A"),
("3B", 3, "B"),
("3C", 3, "C"),
("2A", 2, "A"),
("2B", 2, "B"),
("2C", 2, "C"),
("1A", 1, "A"),
("1B", 1, "B"),
("1C", 1, "C");

INSERT INTO alumno (DNI_alumno, nombre_alumno, apellido_alumno, contenidos, id, ID_CURSO) VALUES 
(46453515, "Ana Luz", "Bazan", "Debe: Proyecto de CNC", 2, "6A"),
(98765432, "Anahi Ludmila", "Noriega", "Sin comentarios", 3, "2C");


INSERT INTO profesor (DNI, nombre, apellido, id) VALUES 
(45485190, "Ludmila Anahí", "Noriega", 1);

INSERT INTO materia (cod_materia, nombre, cursos) VALUES 
("PROGRAMACION","Programación", "7A");

INSERT INTO nota (materiia, alumnoo, numero) VALUES 
("PROGRAMACION", 46453515, 9);

INSERT INTO profe_materia VALUES (45485190, "PROGRAMACION");