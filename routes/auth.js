const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');


// GET /auth/register
router.get('/register', (req, res) =>{
    res.render('pages/inscription', {success: false, message: ''})
});

// POST /auth/register
router.post('/register', authController.register);


module.exports = router;