let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    let message = {
        "message": "Hello json"
      }
      
    res.json(JSON.stringify(message));
});

 module.exports = app;
