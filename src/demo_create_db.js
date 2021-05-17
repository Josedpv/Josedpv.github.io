
var mysql = require('../node_modules/mysql/index');

var con = mysql.createConnection({// connect to site
	host: "localhost",
	user: "jose",
	password: "1234"
  });
  
  con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	con.query("CREATE DATABASE mydb", function (err, result) {
	  if (err) throw err;
	  console.log("Database created");
	});
  });

var con = mysql.createConnection({// connect to database just created
	host: 'jose',
	user: "jose",
	password: '1234',
	database: "mydb"//,port: '8889',//jose

	//socketPath: '/var/run/mysqld/mysqld.sock'
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = "CREATE TABLE customers (ID INT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
	con.query(sql, function (err, result) {
	  if (err) throw err;
	  console.log("Table created");
	});
 
	var sql = "INSERT INTO customers (ID,name, address) VALUES ('1','Jose Perez', 'https://www.google.com/')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});


});
con.query("SELECT * FROM customers", function (err, result, fields) {
	if (err) throw err;
	console.log(result);
	exports = result;

});


 