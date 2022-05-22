const express = require('express');
const app = express();
 
// Serves Express Yourself website
app.use(express.static('public'));