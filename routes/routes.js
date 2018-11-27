let mysql = require('mysql');

// Connect to the dispatcher database
let dispatcherDB = mysql.createConnection({
    host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'masterAdmin',
    password: 'Pa55word',
    database: 'dispatcherdb'
});

module.exports = function (app) {

    // Displays index (home) page
    app.get('/', function (req, res) {
// Connect to the dispatcher database
        console.log("In route /");
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });
        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewRequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accommodations);
                    console.log(rows[i].timeIn);
                }
            }
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM inProcessRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idinProcessRequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accommodations);
                    console.log(rows[i].vanNumber);
                    console.log(rows[i].timeIn);
                }
            }
        });

        dispatcherDB.end();
        res.redirect('index.html');
    });

    // Displays index (home) page
    app.get('/index', function (req, res) {
        console.log("In route /index");
// Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });
        // Execute the newrequest SELECT ALL Query
        dispatcherDB.query('SELECT * FROM newRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idnewRequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accommodations);
                    console.log(rows[i].timeIn);
                }
            }
        });

        dispatcherDB.query('SELECT * FROM inProcessRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    console.log(rows[i].idinProcessRequests);
                    console.log(rows[i].rideTo);
                    console.log(rows[i].rideFrom);
                    console.log(rows[i].numPassengers);
                    console.log(rows[i].accommodations);
                    console.log(rows[i].vanNumber);
                    console.log(rows[i].timeIn);
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

    // Adds the newRequest to the AWS MySQL DB
    app.post('/submitRequest', function (req, res) {
// Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'dispatcherdb'
        });
        // Prepared statement to insert into newrequests table
        let addRequestStmt = 'INSERT INTO newRequests(rideTo, rideFrom, numPassengers, ' +
            'accommodations, timeIn) VALUES (?, ?, ?, ?, ?)';

        let d = new Date();
        let timeInMS = d.getTime();
        const timeOffset = new Date().getTimezoneOffset();
        let timeIn = timeInMS + timeOffset;

        let newRequest = [req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, timeIn];

        // Execute the insert statement
        dispatcherDB.query(addRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Retrieve inserted id
            console.log("Going to: " + req.body.goingTo);
        });
        dispatcherDB.end();

        // Sends the user back to the home page
        res.redirect('/index');
    });

};

// Queries specific newrequest database entries with a condition
function getSpecificNewRequests(column, condition) {

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

    // Execute the insert statement
    dispatcherDB.query('DELETE FROM newrequests WHERE idnewrequests = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    });
    dispatcherDB.end();
}

// Delete an entry from the newrequest table
function deleteInProcess(id) {

    // Execute the insert statement
    dispatcherDB.query('DELETE FROM inprocess WHERE idinProcess = ?', [id], function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    });
    dispatcherDB.end();
}
