let mysql = require('mysql');
//let dispatcherDB = require('dispatcherdb.js');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('/index.html')
    });

    app.get('/addRequest', function (req, res) {
        res.render('/addRequest.html');
    });


    app.post('/submitRequest', function (req, res) {

        console.log("RequestID = " + req.body);

        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'Alfred',
            port: '3306',
            user: 'jpalmstrom',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });


        // Prepared statement to insert into newrequests table
        let addRequestStmt = 'INSERT INTO newrequests(idnewrequests, rideTo, rideFrom, numPassengers, ' +
            'accomodations, timeArrived) VALUES (?, ?, ?, ?, ?, ?)';

        let newRequest = [req.body.requestID, req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, req.body.timeArrived];

        // Execute the insert statement
        dispatcherDB.query(addRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Retrieve inserted id
            console.log('Request Id:' + results.insertId);
        });

        dispatcherDB.end();

        // Sends the user back to the home page
        res.redirect('/index.html');
    });


};