const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: '',
    database: "Plataforma"
});

connection.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('Conectada a la base de datos');
});

module.exports = connection; 
