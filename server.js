var mysql = require('mysql');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

// Sets relative path for Express to serve files out of views folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// Create connection to mySQL database
var connection = mysql.createConnection({
    //properties
    host: 'Alfred',
    port: '3306',
    user: 'jpalmstrom',
    password: 'Pa55word'
});

connection.connect(function (err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("DB is connected!")
    }
});

// Send the landing page file
app.get('/', function (req, res) {
    res.sendFile("index.html");
});

// Listen for the server to start
app.listen(port, function () {
    console.log("App is running on PORT: " + port);
});