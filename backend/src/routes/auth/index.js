const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/login', require('./login'));
router.use('/change', require('./change'));
router.use('/register', require('./register'));
router.use('/code', require('./code'));
router.use('/verify', require('./verify'));
router.use('/user', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./user'));
router.use('/unauthorized', require('./unauthorized'));

module.exports = router;
