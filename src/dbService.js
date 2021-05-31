const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: 'jose',//'jose'
	user: "jose",//'jose'
	password: '1234',
	database: "jose"
   // ,port: '3306',//jose
/*    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
    PORT=5000
USER=robert
PASSWORD=1234
DATABASE=mydb
DB_PORT=3306
HOST=localhost */
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});
var sql = "INSERT INTO clients (ID,name, address) VALUES ('250000','Jose Perez', 'https://www.youtube.com/')";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM clients;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    // async insertNewName(name) {
    //     try {
    //         const dateAdded = new Date();
    //         const insertId = await new Promise((resolve, reject) => {
    //             const query = "INSERT INTO customers (name, address) VALUES (?,?);";

    //             connection.query(query, [name, dateAdded] , (err, result) => {
    //                 if (err) reject(new Error(err.message));
    //                 resolve(result.insertId);
    //             })
    //         });
	// 		console.log(insertId)
    //         return {
    //             id : insertId,
    //             name : name,
    //             dateAdded : dateAdded
    //         };
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async deleteRowById(ID) {
    //     try {
    //         ID = parseInt(ID, 10); 
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "DELETE FROM customers WHERE ID = ?";
    
    //             connection.query(query, [ID] , (err, result) => {
    //                 if (err) reject(new Error(err.message));
    //                 resolve(result.affectedRows);
    //             })
    //         });
    
    //         return response === 1 ? true : false;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }

    // async updateNameById(ID, name) {
    //     try {
    //         ID = parseInt(ID, 10); 
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "UPDATE customers SET name = ? WHERE ID = ?";
    
    //             connection.query(query, [name, ID] , (err, result) => {
    //                 if (err) reject(new Error(err.message));
    //                 resolve(result.affectedRows);
    //             })
    //         });
    
    //         return response === 1 ? true : false;
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }
    // }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM clients WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;