const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const guestMiddleware = require('../middleware/guest');


// GET /auth/register
router.get('/register', guestMiddleware, (req, res) =>{
    res.render('pages/inscription', {success: false, message: '', user: req.session.user || null})
});

// POST /auth/register
router.post('/register', authController.register);

// GET /auth/login
router.get('/login', guestMiddleware, (req, res) => {
    res.render('pages/login', { message: '' , user: req.session.user || null});
});

// POST /auth/login
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;