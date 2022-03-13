const express = require('express');
const notes = require('./routes')
const app = express


// creates route for /api/notes
app.use('/notes', notes)

module.exports = app;