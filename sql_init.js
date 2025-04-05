var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "usernamehere",
    password: "passwordhere"
  });
  
  con.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    };
    // Now we are connected! Time to find all the risks hidden in the comments
    console.log('connected as: ' + con.threadId);
    con.query("CREATE DATABASE companies", function (err, result) {
        if (err) {
            console.error('error creating database ' + err.stack);
            return;
        };
        console.log("Database for companies created");
    });
    var sql = "CREATE TABLE 2024_Fiscal_Year (id INT AUTO_INCREMENT PRIMARY KEY name VARCHAR(255), reported (VARCHAR(255), hidden (VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          };
        console.log("Table for the 2024 fiscal year created");
    });
});
