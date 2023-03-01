"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8000;
console.log("server is started at port ".concat(port));
app.get('/', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listenting at http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map