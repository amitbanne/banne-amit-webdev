var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ipaddress);
