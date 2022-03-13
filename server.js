const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

// using middlewear to for better data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//What folder should express serve the files from, in this case, public
app.use(express.static('public'));

// using the index.html file in routes as a route
app.use('/api', api);

// sending the notes file when the notes button is clicked on
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// sending the public/index.html file when accessing server base
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// listening to port 3001
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

