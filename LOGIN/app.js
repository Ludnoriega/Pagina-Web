//invocamos a express
const express = require('express'); 
const app = express();

//conexion de rutas
app.get('/', (req, res) =>{
    res.render('inicio');
});

app.get('/login', (req, res) =>{
    res.render('login');
});

app.get('/admin', (req, res)=>{
    res.render('admin');
});

app.get('/alumno', (req, res)=>{
    res.render('alumno');
});

app.get('/agregar_alumno', (req, res)=>{
    res.render('agregar_alumno');
});

app.get('/agregar_materia', (req, res)=>{
    res.render('agregar_materia');
});

app.get('/verificar_alumno', (req, res)=>{
    res.render('verificar_alumno');
});

app.get('/agregar_notas', (req, res)=>{
    res.render('agregar_notas');
});

app.get('/libreta', (req, res)=>{
    res.render('libreta');
});

app.get('/desaprobadas', (req, res)=>{
    res.render('desaprobadas');
});

app.get('/situacion_materias', (req, res)=>{
    res.render('situacion_materias');
});

app.get('/usuario', (req, res)=>{
    res.render('usuario');
});

//seteamos urlencoded para los datos del login
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//directorio de public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

//establecemos el motor de pantillas ejs
app.set('view engine', 'ejs');

//invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//variables de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

//modulo de conexion de la bd
const connection = require('./database/db');

//AUTENTICACION
app.post('/auth', (req, res)=>{
    const user = req.body.usr;
    const pass = req.body.password;
       connection.query('SELECT * FROM usuarios WHERE usuarioo = ?', [user], (error, results) =>{
           if(error){
               console.log("Error sql es: "+ error);
               return;
           }
           if(pass != results[0].contrasenia){
               res.render('login', {
                   alert: true,
                   alertTitle: "Error",
                   alertMessage: "USUARIO Y/O CONTRASEÑA INCORECTOS",
                   alertIcon: "error",
                   showConfirmButton: true,
                   timer: 2000,
                   ruta: 'login'
               });
           }
           else{
               if(results[0].rol == "admin"){
                   res.render('login', {
                       alert: true,
                       alertTitle: "Conexion exitosa",
                       alertMessage: "¡BIENVENIDO ADMIN!",
                       alertIcon: "succes",
                       showConfirmButton: false,
                       timer: 2000,
                       ruta: 'admin'
                   });
               }
               if(results[0].rol == "alumno"){
                   res.render('login', {
                       alert: true,
                       alertTitle: "Conexion exitosa",
                       alertMessage: "¡BIENVENIDO ALUMNO!",
                       alertIcon: "succes",
                       showConfirmButton: false,
                       timer: 1500,
                       ruta: 'alumno'
                   });
               }
           }
       });
});


//REGISTRO DE MATERIA
app.post('/agregar_materia', (req, res)=>{
    const nombre_M = req.body.materiiaa;
    const nombre_m = req.body.materia;
    const cursoo = req.body.curso;
        connection.query('INSERT INTO materia SET ?', 
        {cod_materia:nombre_M, nombre:nombre_m, cursos:cursoo}, (error, results)=>{
            if(error){
                console.log("El error de MYSQL es: "+ error);
            }
            else{
                res.render('agregar_materia', {
                    alert: true,
                    alertTitle: "¡CARGA DE MATERIA EXITOSA!",
                    alertMessage: "SE AGREGO PERFECTAMENTE",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 5000,
                    ruta: 'agregar_materia'
                });
            }
        });
})



//VERIFICACIÓN DE ALUMNO
app.post('/verificar', (req, res)=>{
    const dni = req.body.DNI;
    const apellido = req.body.APELLIDO;
        connection.query('SELECT * FROM Alumno WHERE DNI_alumno = ?', [dni], (error, results) =>{
            if(error){
                console.log("Error sql es: "+ error);
                return;
            }
            if(apellido != results[0].apellido_alumno){
                res.render('verificar_alumno', {
                    alert: true,
                    alertTitle: "ESTE ALUMNO NO ESTÁ EN LA BASE DE DATOS",
                    alertMessage: "VERIFIQUE BIEN LOS DATOS",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 2000,
                    ruta: 'verificar_alumno'
                });
            }
            else{
                res.render('verificar_alumno', {
                    alert: true,
                    alertTitle: "¡ALUMNO ENCONTRADO!",
                    alertMessage: "PUEDE CARGAR LAS NOTAS",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 5000,
                    ruta: 'agregar_notas'
                });
            }
        });
});

//AGREGAR UN ALUMNO
app.post('/agregar', (req, res)=>{
    const NOMBRE = req.body.nombre;
    const APELLIDO = req.body.apellido;
    const DNI = req.body.dni;
    const COMENTARIO = req.body.comentario;
    const ID = req.body.id;
    const CURSO_DIVI = req.body.curso_divi;
    connection.query('INSERT INTO Alumno SET ?', 
    {nombre_alumno:NOMBRE, apellido_alumno:APELLIDO, DNI_alumno:DNI, contenidos:COMENTARIO, id:ID, ID_CURSO:CURSO_DIVI}, (error, results)=>{
        if(error){
            console.log("El error de MYSQL es: "+ error);
        }
        else{
            res.render('agregar_alumno', {
                alert: true,
                alertTitle: "¡CARGA DE ALUMNO EXITOSA!",
                alertMessage: "SE AGREGO PERFECTAMENTE",
                alertIcon: "succes",
                showConfirmButton: false,
                timer: 5000,
                ruta: 'agregar_alumno'
            });
        }
    });
});

//AGREGAR UNA NOTA
app.post('/agregar_nota', (req, res)=>{
    const MATERIA = req.body.materiaa;
    const DNI = req.body.dni;
    const NOTA = req.body.nota;
    connection.query('INSERT INTO nota SET ?', 
    {materiia:MATERIA, alumnoo:DNI, numero:NOTA}, (error, results)=>{
        if(error){
            console.log("El error de MYSQL es: "+ error);
        }
        else{
            res.render('agregar_notas', {
                alert: true,
                alertTitle: "¡CARGA DE NOTA EXITOSA!",
                alertMessage: "SE AGREGÓ PERFECTAMENTE",
                alertIcon: "succes",
                showConfirmButton: false,
                timer: 5000,
                ruta: 'agregar_notas'
            });
        }
    })
})

//REGISTRO DE USUARIO
app.post('/crear', (req, res)=>{
    const USUARIO = req.body.usuario;
    const CONTRASENIA = req.body.contrasena;
    const ROL = req.body.rol;
        connection.query('INSERT INTO usuarios SET ?', 
        {usuarioo:USUARIO, contrasenia:CONTRASENIA, rol:ROL}, (error, results)=>{
            if(error){
                console.log("El error de MYSQL es: "+ error);
            }
            else{
                res.render('usuario', {
                    alert: true,
                    alertTitle: "¡CARGA DE USUARIO EXITOSA!",
                    alertMessage: "SE AGREGÓ PERFECTAMENTE",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 5000,
                    ruta: 'usuario'
                });
            }
        });
})

app.listen(3309, (req, res)=>{
    console.log("Server funcionando en http://localhost:3309");
});
