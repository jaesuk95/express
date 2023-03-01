"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
console.log("server is started at port ".concat(port));
app.listen(port, function () {
    console.log("Example app listenting at http://localhost:".concat(port));
});
app.get('/', function (req, res) {
    console.log(req);
    res.send({ data: app_model_1.Cat });
});
app.get('/test', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
//# sourceMappingURL=app.js.map