"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
console.log("server is started at port ".concat(port));
app.use(express.json());
app.get('/cats', function (req, res) {
    try {
        var cats = app_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats
            }
        });
    }
    catch (e) {
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
});
app.get('/cats/:id', function (req, res) {
    try {
        var id_1 = req.params.id;
        console.log("requested id ".concat(id_1));
        var cats = app_model_1.Cat.find(function (cat) {
            return cat.id === id_1;
        });
        res.status(200).send({
            success: true,
            data: {
                cats: cats
            }
        });
    }
    catch (e) {
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
});
app.post('/cats', function (req, res) {
    try {
        var body = req.body;
        app_model_1.Cat.push(body);
        res.status(201).send({
            success: true,
            message: '등록 성공, 하지만 db 가 없으므로 실제로 등록 안됨'
        });
    }
    catch (e) {
    }
});
app.use(function (req, res, next) {
    console.log(req.rawHeaders[3]);
    console.log('middleware has been processed');
    next();
});
app.get('/tutorial1/cats/som', function (req, res, next) {
    console.log('this middleware is specifically for "som" cat');
    next();
});
app.get('/tutorial1/cats/blue', function (req, res) {
    console.log('/cats/blue has been called');
    res.send({ blue: app_model_1.Cat[0] });
});
app.get('/tutorial1/cats/som', function (req, res) {
    console.log('tutorial1/cats/som has been called');
    res.send({ som: app_model_1.Cat[1] });
});
app.get('/tutorial1/', function (req, res) {
    console.log(req);
    console.log(req.rawHeaders[1]);
    res.send({ data: app_model_1.Cat });
});
app.get('/tutorial1/hello-world', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listenting at http://localhost:".concat(port));
});
app.use(function (req, res, next) {
    var url = req.url;
    console.log("request ".concat(url, " has not been found"));
    res.send({ error: '404 not found error' });
});
//# sourceMappingURL=app.js.map