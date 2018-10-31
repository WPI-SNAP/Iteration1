var express = require('express');
var router = express.Router();

/*
 * Sends a GET request to receive all current db data upon launching the webpage
 */
//TODO: Find out how to query the MySQL database
router.get('/', function (req, res) {


});

// Create a new ride request based on the AddRequest Form
//TODO: Find out how to insert into MySQL database
router.post('/', function (req, res) {

});

module.exports = router;