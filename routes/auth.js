const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = []; // Store in-memory for now

router.post('/register', async (req, res) => {
    console.log('Request Body:', req.body); // 👈 ADD THIS LINE
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send({ error: 'Missing fields' });
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed, role });
    res.send({ msg: 'Registered' });
});

router.post('/login', async (req, res) => {
    console.log('Request Body:', req.body);  // <-- Add this line

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Missing fields');

    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

module.exports = router;
