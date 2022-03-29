const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/subscribe', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./subscribe'));

module.exports = router;
