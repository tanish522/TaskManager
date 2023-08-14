require("./connection.js"); // this import statement will connect our server to db
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
