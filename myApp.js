require('dotenv').config()

let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
    var log = req.method + " " + req.path + " - " + req.ip;
    console.log(log);
    next();
} )

app.get("/", (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == 'uppercase')
        msg = "HELLO JSON"
    else
        msg = "Hello json"

    res.json({
        message: msg
      });
});

 module.exports = app;
