var http = require('http');
var fs= require('fs');
var mysql = require('mysql');
var hidden = '';
var reported = '';
var name = '';


http.createServer(function (req, res) {
    fs.readFile("timmy's_lemonade.html", function(err, data) {
      if (data !== undefined) {
        lines = data.split('\n').array;
        for (var i=0; i < lines.length; ++i) {
            var curr_line = lines[i];
            if (curr_line.startsWith("<!--")) {
                hidden += curr_line;
            } else if (curr_line.startsWith("<title>")) {
                name += curr_line;
            } else if (curr_line.startsWith("<h3>")) {
                reported += curr_line;
            }
        }
      }
      res.writeHead(200, {'Content-Type': 'text/html'});

            // Establishing a connection
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "20062006mac",
                database: "companies"
            });
            
            con.connect(function(err) {
                if (err) {
                console.error('error connecting: ' + err.stack);
                return;
                };
                // Now we are connected! Time to find all of our client's secret risks and implications in the comments
                console.log('connected as: ' + con.threadId);
                var to_add = "INSERT INTO 2024_Fiscal_year (name, reported, hidden) VALUES (";
                var to_add_rest = name + ', ' + reported + ', ' + hidden +')';
                to_add += to_add_rest;
                con.query(to_add, function (err, result) {
                    if (err) {
                        console.error('error inserting: ' + err.stack);
                        return;
                    };
                    console.log('successfully inserted an entry');
                });
                // Display all customer companies with potentially hidden risks and/or implications in tax transactions
                // SQL Escape used here
                var to_esc = 'In%';
                var selector = "SELECT * FROM 2024_Fiscal_Year WHERE hidden LIKE " + mysql.escape(to_esc);
                var rest_of_selector = " ORDER BY name LIMIT 10";
                selector += rest_of_selector;
                con.query(selector, function (err, result) {
                    if (err) {
                        console.error('error retrieving data: ' + err.stack);
                        return;
                    };
                    console.log('successfully retrieved the 2024 fiscal year data');
                    console.log(result);
                });
            });
            return res.end();
            });
        }).listen(8080);
