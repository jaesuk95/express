"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
app.use(function (req, res, next) {
    console.log(req.rawHeaders[3]);
    console.log('middleware has been processed');
    next();
});
app.get('/cats/som', function (req, res, next) {
    console.log('this middleware is specifically for "som" cat');
    next();
});
console.log("server is started at port ".concat(port));
app.listen(port, function () {
    console.log("Example app listenting at http://localhost:".concat(port));
});
app.get('/cats/blue', function (req, res) {
    console.log('/cats/blue has been called');
    res.send({ blue: app_model_1.Cat[0] });
});
app.get('/cats/som', function (req, res) {
    console.log('/cats/som has been called');
    res.send({ som: app_model_1.Cat[1] });
});
app.get('/', function (req, res) {
    console.log(req);
    console.log(req.rawHeaders[1]);
    res.send({ data: app_model_1.Cat });
});
app.get('/hello-world', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
app.use(function (req, res, next) {
    var url = req.url;
    console.log("request ".concat(url, " has not been found"));
    res.send({ error: '404 not found error' });
});
//# sourceMappingURL=app.js.map