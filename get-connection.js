const mysql = require('mysql2/promise');

async function getConnection(){
    const connection = await mysql.createConnection({
        host: 'localhost',
    
        // Your port; if not 3306
        port: 3306,
    
        // Your username
        user: 'root',
    
        // Be sure to update with your own MySQL password!
        password: '2Chiret9?A13',
        database: 'employee_management_db'
    });
    return connection;
}
module.exports = getConnection;