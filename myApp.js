require('dotenv').config()
require('body-parser')

var bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
    var log = req.method + " " + req.path + " - " + req.ip;
    console.log(log);
    next();
} )
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/now", 
    (req, res, next) => {
        req.time = new Date().toString()
        next()
    }, 
    (req, res) => {
        res.json({
            time: req.time
        })
    }
)

app.get("/:word/echo", (req, res) => {
    res.json({
        echo: req.params.word
    })
})

app.get("/name", (req, res) => {
    res.json({
        name: `${req.query.first} ${req.query.last}`
    })
})

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
