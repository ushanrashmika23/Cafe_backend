// routes/student.js

const express = require('express');
const router = express.Router();

// Define the route handler for /students
router.get('/', (req, res) => {
    res.redirect('/students.html'); // Redirect to students.html
});

module.exports = router;
