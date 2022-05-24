const express = require('express');
const app = express();

// initialising statements, including setting of port
app.use(express.static('public'));
const PORT = process.env.PORT || 4001;

const names = ["A", "B", "C", "D", "E"];

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log(names);
});

app.get('/anotherpage', (req, res) => {
    res.send('Another page');
});

app.get('/test403/', (req, res) => {
    res.status(403).send();
});

app.get('/test500/', (req, res) => {

});

app.post('/', (req, res) => {
    names.push("F");
    console.log(names);
});

app.listen(PORT, () => {
    // Open a browser window and type "localhost:{PORT}" as the URL
    console.log(`Listening on port ${PORT}`)
  })

