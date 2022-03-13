const notes = require('express').Router();
const fs = require('fs')
const uuid = require('../helpers/uuid')


// declaring database file. reading it, converting it to javascript
let jsonDbFile = fs.readFileSync('./db/db.json', "utf-8");
let dataB = JSON.parse(jsonDbFile)

// on get request the dataB file is returned
notes.get('/', (req, res) => {
    res.json(dataB)
})

// on a post request the request.body is turned into a newNote variable, added to the database, and then the user is responded with their new note
notes.post('/', (req, res) => {

    // declaring our database file. reading it, and turning it into javascript
    const { title, text } = req.body;

    // ccreating the newNote variable with the info from the body as well as a unique id
    const newNote = {
        title,
        text,
        id: uuid()
    }

    // pushing the new note and saving the information as a string
    dataB.push(newNote)
    const fileToSend = JSON.stringify(jsonDbFile)

    // rewriting json file to include the new note
    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");

    // responding to the user with the newNote variable
    res.json(fileToSend)
})

// When the user clicks on the delete button, the note the user wants to delete is removed from the file
notes.delete('/:id', (req, res) => {
    res.send("Deleted that note")

    // declaring the variable that is the id that the user clicked on
    const deleteID = req.params.id

    // looping through each object in the dataB array. If id matches, that object is then removed from the dataB array
    for (let index = 0; index < dataB.length; index++) {
        const element = dataB[index].id;
        if (element === deleteID) {
            dataB.splice(index, 1)
        }
    }

    // stringifying the dataB array format and rewriting it without including the removed item.
    const fileToSend = JSON.stringify(dataB)
    fs.writeFileSync('./db/db.json', fileToSend, "utf-8");
})


module.exports = notes;