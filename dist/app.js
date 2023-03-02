"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var app = express();
var port = 8000;
console.log("server is started at port ".concat(port));
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(cats_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(function (req, res, next) {
            console.log("middleware has been processed by request ".concat(req.rawHeaders[3]));
            next();
        });
        this.app.use(express.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            var url = req.url;
            console.log("request ".concat(url, " has not been found"));
            res.send({ error: '404 not found error' });
        });
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.app.listen(port, function () {
            console.log("App listening at http://localhost:".concat(port));
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
app.get('/hello-world', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
//# sourceMappingURL=app.js.map