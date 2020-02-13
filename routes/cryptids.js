// Mounted at '/cryptds'
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get
router.get('/', (req, res) => {
    // get all cryptds, pass to page
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(allCryptids);
    console.log(cryptidData);
    //
    res.render('cryptids/index', { cryptids: cryptidData });
});

// New - Get
router.get('/new', (req, res) => {
    res.render('cryptids/new');
});


// Create - Post
router.post('/', (req, res) => {
    // console.log('😅');
    console.log(req.body);
    // read cryptids
    let cryptids = fs.readFileSync('./cryptids.json');
    // json parse cryptids
    let cryptidData = JSON.parse(cryptids);
    // add req.body to the end of cryptids
    cryptidData.push(req.body);
    // json stringify cryptids
    let newCryptids = JSON.stringify(cryptidData);
    // write cryptids
    fs.writeFileSync('./cryptids.json', newCryptids);

    // TODO redirect to show page for new cryptid
    res.redirect(`/cryptids/${cryptidData.length - 1}`);
});

// Show - Get
router.get('/:id', (req, res) => {
    // get actual cryptid at id of req.params.id
    let cryptids = fs.readFileSync('./cryptids.json');
    let cryptidData = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.params.id);
    let oneCryptid = cryptidData[cryptidIndex];
    oneCryptid.id = cryptidIndex;

    res.render('cryptids/show', { cryptid: oneCryptid });
});

// Edit - Get
router.get('/edit/:id', (req, res) => {
    // TODO get cryptid info and pass it in
    let cryptids = fs.readFileSync('./cryptids.json');
    cryptids = JSON.parse(cryptids);
    let cryptidIndex = parseInt(req.params.id);
    let oneCryptid = cryptids[cryptidIndex];
    oneCryptid.id = cryptidIndex;

    res.render('cryptids/edit', { cryptid: oneCryptid });
});

// Update - Put
router.put('/:id', (req, res) => {
    console.log(req.body);
    // Read the file
    let cryptids = fs.readFileSync('./cryptids.json');
    // json parse the cryptids
    cryptids = JSON.parse(cryptids);
    // change the name and type of cryptid at index
    cryptids[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));

    // redirect to show page for edited cryptid
    res.redirect(`/cryptids/${req.params.id}`);
})

// Destroy - Delete
router.delete('/:id', (req, res) => {
    // console.log(`Deleting cryptid at ID ${req.params.id}`);
    // Read cryptids
    let cryptids = fs.readFileSync('./cryptids.json');
    // JSON parse cryptids
    cryptids = JSON.parse(cryptids);
    // Remove cryptid from array at index
    let deadCryptid = cryptids.splice(req.params.id, 1);
    // Write JSON stringify version of cryptids
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));

    console.log(`Press F to pay respects to ${deadCryptid[0].name}`);
    res.redirect('/cryptids');
});

module.exports = router;