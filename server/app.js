var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Path
var path = require('path');
app.use(express.static(path.join(__dirname, './public')));


// Route paths
var index = require('./routes/index');
var caro = require('./routes/index');

// Start node server
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

app.use(bodyParser.json());
app.use( '/', index);
app.use('/conKitty', index);
app.use('/caro.html', caro);

module.exports = app;