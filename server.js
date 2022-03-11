const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
//What folder should express serve the files from, in this case, public
app.use(express.static('public'));
//needs to be done before the app.listen
//path.join joins a URL. __dirname is the path to where the server is
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html'))
);
//If we want to make a request to /notes, then we do something similar to line 10. When the URL hits /notes, we put the file we want in the string at the end
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))
);

//next steps: Coding the server so that it serves the notes.html after we make the request

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

