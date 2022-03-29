const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/add', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./add'));
router.use('/list', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./list'));
router.use('/delete', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./delete'));

module.exports = router;
