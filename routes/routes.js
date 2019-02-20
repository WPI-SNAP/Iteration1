const mysql = require('mysql');
const moment = require('moment');

module.exports = function (app) {

    // Displays index (home) page
    app.get('/', function (req, res) {
// Connect to the dispatcher database
        console.log("In route /");

        let allNewRequests = [];
        let currNewRequest = 0;
        let allProcessRequests = [];
        let currProcessRequest = 0;

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });
        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {

                for (let i in rows) {
                    allNewRequests[currNewRequest++] = {
                        idnewRequests: rows[i].idnewRequests,
                        rideTo: rows[i].rideTo,
                        rideFrom: rows[i].rideFrom,
                        numPassengers: rows[i].numPassengers,
                        accommodations: rows[i].accommodations,
                        timeIn: rows[i].timeIn
                    };
                }

                // Execute the insert statement
                dispatcherDB.query('SELECT * FROM inProcessRequests', (err, rows) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    else {
                        for (let i in rows) {
                            allProcessRequests[currProcessRequest++] = {
                                idinProcessRequests: rows[i].idinProcessRequests,
                                rideTo: rows[i].rideTo,
                                rideFrom: rows[i].rideFrom,
                                numPassengers: rows[i].numPassengers,
                                accommodations: rows[i].accommodations,
                                vanNumber: rows[i].vanNumber,
                                timeIn: rows[i].timeIn
                            };
                        }
                        dispatcherDB.end();

                        res.render('index.ejs', {
                            newRequestRows: allNewRequests,
                            inProcessRows: allProcessRequests
                        });
                    }
                });
            }
        });
    });

    // Displays index (home) page
    app.get('/index', function (req, res) {
        console.log("In route /index");
        let allNewRequests = [];
        let currNewRequest = 0;
        let allProcessRequests = [];
        let currProcessRequest = 0;

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });
        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {

                for (let i in rows) {
                    allNewRequests[currNewRequest++] = {
                        idnewRequests: rows[i].idnewRequests,
                        rideTo: rows[i].rideTo,
                        rideFrom: rows[i].rideFrom,
                        numPassengers: rows[i].numPassengers,
                        accommodations: rows[i].accommodations,
                        timeIn: rows[i].timeIn
                    };
                }

                // Execute the insert statement
                dispatcherDB.query('SELECT * FROM inProcessRequests', (err, rows) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    else {
                        for (let i in rows) {
                            allProcessRequests[currProcessRequest++] = {
                                idinProcessRequests: rows[i].idinProcessRequests,
                                rideTo: rows[i].rideTo,
                                rideFrom: rows[i].rideFrom,
                                numPassengers: rows[i].numPassengers,
                                accommodations: rows[i].accommodations,
                                vanNumber: rows[i].vanNumber,
                                timeIn: rows[i].timeIn
                            };
                        }
                        dispatcherDB.end();

                        res.render('index.ejs', {
                            newRequestRows: allNewRequests,
                            inProcessRows: allProcessRequests
                        });
                    }
                });
            }
        });
    });

    // Displays AddRequest Page
    app.get('/addRequest', function (req, res) {
        res.render('addRequest.ejs');
    });

    // Displays Admin Page
    app.get('/admin', function (req, res) {
        res.render('admin.ejs');
    });

    // Adds the newRequest to the AWS MySQL DB
    app.post('/submitRequest', function (req, res) {
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });
        // Prepared statement to insert into newrequests table
        let addRequestStmt = 'INSERT INTO newRequests(rideTo, rideFrom, numPassengers, ' +
            'accommodations, timeIn) VALUES (?, ?, ?, ?, ?)';

        let newRequest = [req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, moment(new Date()).toString()];

        // Execute the insert statement
        dispatcherDB.query(addRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Retrieve inserted id
            console.log("Going to: " + req.body.goingTo);
            dispatcherDB.end();
            // Sends the user back to the home page
            res.redirect('/index');
        });
    });

    // Displays AssignRequest Page
    app.get('/assignNewRequest/*', function (req, res) {
        console.log("Inside assignRequest");
        let id = '';
        let allRequests = [];
        let currChar = '';
        let numSlash = 0;

        //Parse the URL and find the eventid
        for (let i=0; i<req.url.length; i++){
            currChar = req.url.charAt(i);
            if(currChar === '/'){
                numSlash++;
                continue;
            }
            if(numSlash === 2) id += currChar;
        }

        console.log('Got URL: ' + req.url);
        console.log('Looking for eventid: ' + id);

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newRequests WHERE idnewRequests = ?', [id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allRequests = {
                        idnewRequests: rows[0].idnewRequests,
                        rideTo: rows[0].rideTo,
                        rideFrom: rows[0].rideFrom,
                        numPassengers: rows[0].numPassengers,
                        accommodations: rows[0].accommodations,
                        vanNumber: rows[0].vanNumber,
                        timeIn: rows[0].timeIn
                    };
                }
                dispatcherDB.end();
                res.render('assignNewRequest.ejs', {
                    request: allRequests
                });
            }
        });

    });

    // Adds the newRequest to the AWS MySQL DB
    app.post('/submitAssignNewRequest', function (req, res) {
        console.log("Inside submitAssignRequest");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });
        // Prepared statement to insert into newrequests table
        let addRequestStmt = 'INSERT INTO inProcessRequests(idinProcessRequests, rideTo, rideFrom, numPassengers, ' +
            'accommodations, vanNumber, timeIn) VALUES (?, ?, ?, ?, ?, ?, ?)';

        let newRequest = [req.body.requestID, req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, req.body.vanNumber, req.body.timeIn];

        // Execute the insert statement
        dispatcherDB.query(addRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Retrieve inserted id
            console.log("Going to: " + req.body.goingTo);
        });

        // Execute the insert statement
        dispatcherDB.query('DELETE FROM newRequests WHERE idnewRequests = ?', [req.body.requestID], function (error, results, fields) {
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
            dispatcherDB.end();
            // Sends the user back to the home page
            res.redirect('/index');
        });

    });

    // Displays DeleteRequest Page
    app.get('/deleteNewRequest/*', function (req, res) {
        console.log("Inside deleteRequest");
        let id = '';

        let allRequests = [];

        let currChar = '';
        let numSlash = 0;
        //Parse the URL and find the eventid
        for (let i=0; i<req.url.length; i++){
            currChar = req.url.charAt(i);
            if(currChar === '/'){
                numSlash++;
                continue;
            }
            if(numSlash === 2) id += currChar;
        }

        console.log('Got URL: ' + req.url);
        console.log('Looking for eventid: ' + id);

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM newRequests WHERE idnewrequests = ?', [id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allRequests = {
                        idnewRequests: rows[0].idnewRequests,
                        rideTo: rows[0].rideTo,
                        rideFrom: rows[0].rideFrom,
                        numPassengers: rows[0].numPassengers,
                        accommodations: rows[0].accommodations,
                        timeIn: rows[0].timeIn
                    };
                }
                dispatcherDB.end();
                res.render('rejectNewRequest.ejs', {
                    request: allRequests
                });
            }
        });
    });

    // Deletes requests from the AWS MySQL DB
    app.post('/submitRejectNewRequest', function (req, res) {
        console.log("Inside submitRejectRequest");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Prepared statement to insert into archivedRequests table
        let status = "Rejected";

        let addArchivedRequestStmt = 'INSERT INTO archivedRequests(idarchivedRequests, rideTo, rideFrom, numPassengers, ' +
            'accommodations, timeIn, status) VALUES (?, ?, ?, ?, ?, ?,?)';

        let newRequest = [req.body.requestID, req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, req.body.timeIn,status];

        // Execute the insert statement
        dispatcherDB.query(addArchivedRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            dispatcherDB.query('DELETE FROM newRequests WHERE idnewRequests = ?', [req.body.requestID], function (error, results, fields) {
                if (error) throw error;
                console.log('deleted ' + results.affectedRows + ' rows');
                // Sends the user back to the home page
                dispatcherDB.end();
                res.redirect('/index');
            });

        });


    });

    ////////////////////////////////////////////////////////////////
    // Do same steps for inProcess Requests
    ////////////////////////////////////////////////////////////////

    // Displays AssignProcessRequest Page
    app.get('/assignProcessRequest/*', function (req, res) {
        console.log("Inside assignProcessRequest");
        let id = '';

        let allRequests = [];


        let currChar = '';
        let numSlash = 0;
        //Parse the URL and find the eventid
        for (let i=0; i<req.url.length; i++){
            currChar = req.url.charAt(i);
            if(currChar === '/'){
                numSlash++;
                continue;
            }
            if(numSlash === 2) id += currChar;
        }

        console.log('Got URL: ' + req.url);
        console.log('Looking for eventid: ' + id);

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM inProcessRequests WHERE idinProcessRequests = ?', [id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allRequests = {
                        idinProcessRequests: rows[0].idinProcessRequests,
                        rideTo: rows[0].rideTo,
                        rideFrom: rows[0].rideFrom,
                        numPassengers: rows[0].numPassengers,
                        accommodations: rows[0].accommodations,
                        vanNumber: rows[0].vanNumber,
                        timeIn: rows[0].timeIn
                    };
                }
                dispatcherDB.end();
                res.render('assignProcessRequest.ejs', {
                    request: allRequests
                });
            }
        });

    });

    // Adds the newRequest to the AWS MySQL DB
    app.post('/submitAssignProcessRequest', function (req, res) {
        console.log("Inside submitAssignRequest");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Prepared statement to UPDATE into inProcessRequests table
        let updateRequestStmt = 'UPDATE inProcessRequests SET rideTo = ?, rideFrom = ?, numPassengers = ?,' +
            'accommodations = ?, vanNumber = ?, timeIn = ? WHERE idinProcessRequests = ?';

        let updateRequest = [req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations,
            req.body.vanNumber, req.body.timeIn, req.body.requestID];

        // Execute the insert statement
        dispatcherDB.query(updateRequestStmt, updateRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }

            dispatcherDB.end();
            res.redirect('/index');
        });


    });

    // Displays DeleteRequest Page
    app.get('/deleteProcessRequest/*', function (req, res) {
        console.log("Inside deleteRequest");
        let id = '';

        let allRequests = [];

        let currChar = '';
        let numSlash = 0;
        //Parse the URL and find the eventid
        for (let i=0; i<req.url.length; i++){
            currChar = req.url.charAt(i);
            if(currChar === '/'){
                numSlash++;
                continue;
            }
            if(numSlash === 2) id += currChar;
        }

        console.log('Got URL: ' + req.url);
        console.log('Looking for eventid: ' + id);

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Execute the insert statement
        dispatcherDB.query('SELECT * FROM inProcessRequests WHERE idinProcessRequests = ?', [id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allRequests = {
                        idinProcessRequests: rows[0].idinProcessRequests,
                        rideTo: rows[0].rideTo,
                        rideFrom: rows[0].rideFrom,
                        numPassengers: rows[0].numPassengers,
                        accommodations: rows[0].accommodations,
                        vanNumber: rows[0].vanNumber,
                        timeIn: rows[0].timeIn
                    };
                }
                dispatcherDB.end();
                res.render('completeProcessRequest.ejs', {
                    request: allRequests
                });
            }
        });
    });

    // Deletes requests from the AWS MySQL DB with status Complete
    app.post('/submitCompleteProcessRequest', function (req, res) {
        console.log("Inside submitDeleteRequest");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        let status = "Complete";

        // Prepared statement to insert into archivedRequests table
        let addArchivedRequestStmt = 'INSERT INTO archivedRequests(idarchivedRequests, rideTo, rideFrom, numPassengers, ' +
            'accommodations, vanNumber, timeIn, status) VALUES (?, ?, ?, ?, ?, ?, ?,?)';

        let newRequest = [req.body.requestID, req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, req.body.vanNumber, req.body.timeIn,status];

        // Execute the insert statement
        dispatcherDB.query(addArchivedRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Execute the insert statement
            dispatcherDB.query('DELETE FROM inProcessRequests WHERE idinProcessRequests = ?', [req.body.requestID], function (error, results, fields) {
                if (error) throw error;
                console.log('deleted ' + results.affectedRows + ' rows');
                // Sends the user back to the home page
                dispatcherDB.end();
                res.redirect('/index');
            });
        });
    });

    // Deletes requests from the AWS MySQL DB with status No-show
    app.post('/submitNoShowProcessRequest', function (req, res) {
        console.log("Inside submitDeleteRequest");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        let status = "No-show";

        // Prepared statement to insert into archivedRequests table
        let addArchivedRequestStmt = 'INSERT INTO archivedRequests(idarchivedRequests, rideTo, rideFrom, numPassengers, ' +
            'accommodations, vanNumber, timeIn, status) VALUES (?, ?, ?, ?, ?, ?, ?,?)';

        let newRequest = [req.body.requestID, req.body.goingTo, req.body.comingFrom, req.body.numPassengers, req.body.accommodations, req.body.vanNumber, req.body.timeIn,status];

        // Execute the insert statement
        dispatcherDB.query(addArchivedRequestStmt, newRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // Execute the insert statement
            dispatcherDB.query('DELETE FROM inProcessRequests WHERE idinProcessRequests = ?', [req.body.requestID], function (error, results, fields) {
                if (error) throw error;
                console.log('deleted ' + results.affectedRows + ' rows');
                // Sends the user back to the home page
                dispatcherDB.end();
                res.redirect('/index');
            });
        });
    });

    // Display Maintenance Page
    app.get('/maintenance', function (req, res) {
        let allMaintenance = [];
        let currMaintenance = 0;

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Select Vans that are in maintenance (isMaintenanced = TRUE)
        dispatcherDB.query('SELECT * FROM vanStatus WHERE isMaintenanced = TRUE', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allMaintenance[currMaintenance++] = {
                        idvanStatus: rows[i].idvanStatus,
                        vanNumber: rows[i].vanNumber,
                        vanInfo:rows[i].vanInfo
                    };
                }
                dispatcherDB.end();

                res.render('maintenance.ejs', {
                    maintenanceRows: allMaintenance
                });
            }
        })
    });

    // Display vanStatus Page
    app.get('/vanStatus', function (req, res) {
        let allVanStatus = [];
        let currVanStatus = 0;

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Select all from vanStatus database
        dispatcherDB.query('SELECT idvanStatus,isMaintenanced,vanInfo FROM vanStatus', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows){
                    let bool= " " ;
                    if(rows[i].isMaintenanced == 0) {
                        bool = "false";
                    }else{
                        bool="true";
                    }
                    allVanStatus[currVanStatus++] = {
                        idvanStatus: rows[i].idvanStatus,
                        isMaintenanced:bool,
                        vanInfo:rows[i].vanInfo
                    };
                }
                dispatcherDB.end();

                res.render('vanStatus.ejs', {
                    vanStatusRows: allVanStatus
                });
            }
        })
    });

    //Displays editVanStatus Page
    app.get('/editVanStatus/*', function (req, res) {
        console.log("Inside editVanStatus");
        let id = '';
        let allRequests = [];
        let currChar = '';
        let numSlash = 0;

        //Parse the URL and find the eventid
        for (let i=0; i<req.url.length; i++){
            currChar = req.url.charAt(i);
            if(currChar === '/'){
                numSlash++;
                continue;
            }
            if(numSlash === 2) id += currChar;
        }

        console.log('Got URL: ' + req.url);
        console.log('Looking for eventid:' + id);

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Execute the select statement
        dispatcherDB.query('SELECT * FROM vanStatus WHERE idvanStatus = ?', [id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    let bool= " " ;
                    if(rows[i].isMaintenanced == 0) {
                        bool = "false";
                    }else{
                        bool="true";
                    }
                    allRequests = {
                        idvanStatus: rows[0].idvanStatus,
                        vanNumber: rows[0].vanNumber,
                        isMaintenanced: bool,
                        vanInfo: rows[0].vanInfo                    };
                }
                dispatcherDB.end();
                res.render('editVanStatus.ejs', {
                    request: allRequests
                });
            }
        });

    });

    // Apply change to the van status
    app.post('/submitEditVanStatus', function (req, res) {
        console.log("Inside submitEditVanStatus");
        // Connect to the dispatcher database
        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Prepared statement to UPDATE into vanStatus table
        let updateVanStatusStmt = 'UPDATE vanStatus SET isMaintenanced = ?, vanInfo = ?' +
            'WHERE idvanStatus = ?';
        console.log("Inside submitEditVanStatus1");

        let updateRequest = [req.body.isMaintenanced, req.body.vanInfo,req.body.idvanStatus];
        console.log("Inside submitEditVanStatus2");

        // Execute the insert statement
        dispatcherDB.query(updateVanStatusStmt, updateRequest, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }

            dispatcherDB.end();
            res.redirect('/vanStatus');
        });


    });


    app.get('/viewArchive', function (req, res) {
        console.log("Inside viewArchive");

        let allArchivedRequests = [];
        let currArchivedRequest = 0;

        let dispatcherDB = mysql.createConnection({
            host: 'snapdispatcherdb.ca40maoxylrp.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'masterAdmin',
            password: 'Pa55word',
            database: 'snapDB'
        });

        // Query all results from the archivedRequests table
        dispatcherDB.query('SELECT * FROM archivedRequests', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                for (let i in rows) {
                    allArchivedRequests[currArchivedRequest++] = {
                        idarchivedRequests: rows[i].idarchivedRequests,
                        rideTo: rows[i].rideTo,
                        rideFrom: rows[i].rideFrom,
                        numPassengers: rows[i].numPassengers,
                        accommodations: rows[i].accommodations,
                        vanNumber: rows[i].vanNumber,
                        timeIn: rows[i].timeIn,
                        status:rows[i].status
                    };
                }
                dispatcherDB.end();

                res.render('archive.ejs', {
                    archivedRequestRows: allArchivedRequests
                });
            }
        })
    });

};

