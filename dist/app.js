"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var app = express();
var port = 8000;
console.log("server is started at port ".concat(port));
app.listen(port, function () {
    console.log("App listening at http://localhost:".concat(port));
});
app.use(express.json());
app.use(function (req, res, next) {
    console.log("middleware has been processed by request ".concat(req.rawHeaders[3]));
    next();
});
app.use(cats_route_1.default);
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