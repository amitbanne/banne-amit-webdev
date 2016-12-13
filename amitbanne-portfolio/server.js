var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./public/assignment/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3005;


app.listen(port, ipaddress);
