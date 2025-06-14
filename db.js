// db.js
const express = require('express');
const sql=require("mssql/msnodesqlv8");


const app = express();
const PORT =process.env.PORT || 3000;
app.use(express.json());

// SQL Server configuration Localhost
// const config = {
//     server :"ACESACHINTA\\MSSQLSERVER2016",
//     database:"dbCommunicationApp",
//     driver:"msnodesqlv8",
//     options:{
//         trustedConnection:true
//     }
//   };


//SQL Server Configuration of Vidyashakti Web Server
const config = {
    server: "208.91.198.196", // your web server's IP
    database: "dbCommunicationApp",
    user: "appadmin", // SQL authentication Username
    password: "Acesinfo@1989", // SQL authentication Password
    port: 1433, // Default port for MSSQL
    options: {
        encrypt: true, // true if your server requires encryption
        trustServerCertificate: true, // true if you want to bypass certificate validation (self-signed certs)
        enableArithAbort: true
    }
};

// Create and export a pool promise
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    process.exit(1); // Exit the process with an error code
  });

module.exports = {
  sql,
  poolPromise,
};