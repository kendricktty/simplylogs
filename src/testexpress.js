// require is the JS equivalent of import in Python and Java.
const express = require('express');
const app = express();
 
app.use(express.static('public'));
const PORT = process.env.PORT || 4001;

const names = ["A", "B", "C", "D", "E"];

app.get('/hello', (req, res, next) => {
    res.send("Hello world!");
});