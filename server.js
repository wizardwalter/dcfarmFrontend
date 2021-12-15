
const express = require('express');
const path = require('path');
var enforce = require('express-sslify');
const app = express();
app.use(enforce.HTTPS());
app.use(express.static(__dirname + '/dist/frontend'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname + '/dist/frontend/src/index.html'));});
app.listen(process.env.PORT || 8080);
