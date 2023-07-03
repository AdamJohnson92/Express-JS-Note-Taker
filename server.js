const express = require('express');
const path = require('path');
const fs = require('fs')
const notesDB = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// let notes = [
//     {title: 'Test',
//     text: 'Note'},
//     {title: "Another",
//     text: 'Test Note'}
// ]

app.get('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to render notes.`)

    console.info(`${req.method} request received to render notes.`)
});

//Where does the /api come from? (I based this off of examples from class)

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved to add a note.`)
    const { title, text } = req.body;

    if (title && text) {
    let newNote = {
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);

        fs.writeFile('./db/db.json', 
        
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) => writeErr
        ? console.error(writeErr)
        : console.info('Successfully added a note!')
        );
    }
    });

    const response = {
        status: 'success',
        body: newNote
    };

    console.log(response);
    res.status(201).json(response);
    } else {
     res.status(500).json('Error in creating new note.')
    }
});




app.listen(PORT, () => 
console.log(`Note taking app is listening at http://localhost:${PORT}`))