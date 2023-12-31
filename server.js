const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes')

const PORT = 3001;

const port = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})


app.listen(port, () => 
console.log(`Note taking app is listening at http://localhost:${port}`))