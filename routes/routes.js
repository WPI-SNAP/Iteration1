let mysql = require('mysql');

module.exports = function (app) {

    // Displays index (home) page
    app.get('/', function (req, res) {
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'Alfred',
            port: '3306',
            user: 'jpalmstrom',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newrequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewrequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accomodations);
                    console.log(rows[i].timeArrived);
                }
            }
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM inprocess', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewrequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accomodations);
                    console.log(rows[i].vanNumber);
                    console.log(rows[i].timeArrived);
                }
            }
        });

        dispatcherDB.end();
        res.redirect('index.html');
    });

    // Displays index (home) page
    app.get('/index', function (req, res) {
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'Alfred',
            port: '3306',
            user: 'jpalmstrom',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });

        // Execute the newrequest SELECT ALL Query
        dispatcherDB.query('SELECT * FROM newrequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewrequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accomodations);
                    console.log(rows[i].timeArrived);
                }
            }
        });

        // Execute the inprocess SELECT ALL Query
        dispatcherDB.query('SELECT * FROM inprocess', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewrequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accomodations);
                    console.log(rows[i].vanNumber);
                    console.log(rows[i].timeArrived);
                }
            }
        });


        dispatcherDB.end();
        res.redirect('index.html');
    });

    // Displays AddRequest Page
    app.get('/addRequest', function (req, res) {
        res.render('addRequest.html');
    });


    app.post('/submitRequest', function (req, res) {

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
            console.log("Request Id: " + req.body.requestID);
        });
        dispatcherDB.end();

        // Sends the user back to the home page
        res.redirect('/index');
    });

    app.post('/submitRequest', function (req, res) {

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
            console.log("Request Id: " + req.body.requestID);
        });
        dispatcherDB.end();

        // Sends the user back to the home page
        res.redirect('/index');
    });

};

// Queries specific newrequest database entries with a condition
function getSpecificNewRequests(column, condition) {
    let dispatcherDB = mysql.createConnection({
        host: 'Alfred',
        port: '3306',
        user: 'jpalmstrom',
        password: 'Pa55word',
        database: 'dispatcherdb'
    });
    // Execute the insert statement
    dispatcherDB.query('SELECT * FROM newrequests WHERE ?? = ?', [column, condition], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        else {
            for (let i in rows) {
                console.log(rows[i].idnewrequests);
                console.log(rows[i].rideTo);
                console.log(rows[i].rideFrom);
                console.log(rows[i].numPassengers);
                console.log(rows[i].accomodations);
                console.log(rows[i].timeArrived);
            }
        }
    });
    dispatcherDB.end();
}

// Queries specific inprocess database entries with a condition
function getSpecificInProcessRequests(column, condition) {
    let dispatcherDB = mysql.createConnection({
        host: 'Alfred',
        port: '3306',
        user: 'jpalmstrom',
        password: 'Pa55word',
        database: 'dispatcherdb'
    });
    // Execute the insert statement
    dispatcherDB.query('SELECT * FROM inprocess WHERE ?? = ?', [column, condition], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        else {
            for (let i in rows) {
                console.log(rows[i].idinProcess);
                console.log(rows[i].rideTo);
                console.log(rows[i].rideFrom);
                console.log(rows[i].numPassengers);
                console.log(rows[i].accomodations);
                console.log(rows[i].vanNumber);
                console.log(rows[i].timeArrived);
            }
        }
    });
    dispatcherDB.end();
}

// Delete an entry from the newrequest table
function deleteNewRequest(id) {
    let dispatcherDB = mysql.createConnection({
        host: 'Alfred',
        port: '3306',
        user: 'jpalmstrom',
        password: 'Pa55word',
        database: 'dispatcherdb'
    });
    // Execute the insert statement
    dispatcherDB.query('DELETE FROM newrequests WHERE idnewrequests = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    });
    dispatcherDB.end();
}

// Delete an entry from the newrequest table
function deleteInProcess(id) {
    let dispatcherDB = mysql.createConnection({
        host: 'Alfred',
        port: '3306',
        user: 'jpalmstrom',
        password: 'Pa55word',
        database: 'dispatcherdb'
    });
    // Execute the insert statement
    dispatcherDB.query('DELETE FROM inprocess WHERE idinProcess = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    });
    dispatcherDB.end();
}
