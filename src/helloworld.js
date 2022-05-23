// require is the JS equivalent of import in Python and Java.
// import statements
const express = require('express');
const app = express();

// initialising statements, including setting of port
app.use(express.static('public'));
const PORT = process.env.PORT || 4001;

const names = ["A", "B", "C", "D", "E"];

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Hello World test app listening on port ${PORT}`)
  })