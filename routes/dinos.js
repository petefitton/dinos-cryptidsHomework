// Mounted at '/dinos'
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get
router.get('/', (req, res) => {
    // get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    console.log(dinoData);
    //
    res.render('dinos/index', { dinos: dinoData });
});

// New - Get
router.get('/new', (req, res) => {
    res.render('dinos/new');
});


// Create - Post
router.post('/', (req, res) => {
    // console.log('😅');
    console.log(req.body);
    // read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // json parse dinos
    let dinoData = JSON.parse(dinos);
    // add req.body to the end of dinos
    dinoData.push(req.body);
    // json stringify dinos
    let newDinos = JSON.stringify(dinoData);
    // write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos);

    // TODO redirect to show page for new dino
    res.redirect(`/dinos/${dinoData.length - 1}`);
});

// Show - Get
router.get('/:id', (req, res) => {
    // get actual dino at id of req.params.id
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/show', { dino: oneDino });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    // TODO get dino info and pass it in
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/edit', { dino: oneDino });
});

// Update - Put
router.put('/:id', (req, res) => {
    console.log(req.body);
    // Read the file
    let dinos = fs.readFileSync('./dinosaurs.json');
    // json parse the dinos
    dinos = JSON.parse(dinos);
    // change the name and type of dino at index
    dinos[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    // redirect to show page for edited dino
    res.redirect(`/dinos/${req.params.id}`);
})

// Destroy - Delete
router.delete('/:id', (req, res) => {
    // console.log(`Deleting dino at ID ${req.params.id}`);
    // Read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // JSON parse dinos
    dinos = JSON.parse(dinos);
    // Remove dino from array at index
    let deadDino = dinos.splice(req.params.id, 1);
    // Write JSON stringify version of dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    console.log(`Press F to pay respects to ${deadDino[0].name}`);
    res.redirect('/dinos');
});

module.exports = router;