

const express = require('express');
const fs = require('fs');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/data', verifyToken, (req, res) => {
    const raw = fs.readFileSync('./data/mockData.json');
    const allData = JSON.parse(raw);
    const role = req.user.role;
    const username = req.user.username;

    let filteredData;
    if (role === 'admin') {
        filteredData = allData;
    } else if (role === 'client') {
        filteredData = allData.filter(d => d.owner === 'client1');
    } else {
        filteredData = allData.filter(d => d.owner === username);
    }

    res.json(filteredData);
});

module.exports = router;
