const { json } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));



//http routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

//api routes
app.get('/api/notes', (req, res) => {

    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) throw err;
        console.log('get')
        const notes = JSON.parse(data);
        res.send(notes)
    })


})

//post request
app.post('/api/notes', (req, res) => {

    //reading our json file and returning as 'data' variable
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) console.log('readFile error');

        //parsing our 'data' array into a readable list of objects
        let objectArray = JSON.parse(data);
        console.log(objectArray);
        //adds our new note req.body to our object array variable
        objectArray.push(req.body);

        //giving each object in our array an id
        objectArray.forEach((item, i) => {
            item.id = i + 1;
        });

        //console.log(objectArray);

        //adding our new note w/ id to our actual JSON file
        let newNoteObj = JSON.stringify(objectArray);
        fs.writeFileSync(path.join(__dirname, '/db/db.json'), newNoteObj, (err, result) => {
            if (err) console.log('writefile error')
        });

    })
    //sending our object array as response
    res.sendStatus(200)
    res.send(req.body)

})

app.delete('/api/notes/:id', (req, res) => {


    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {




    })

})

var server = app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
})
