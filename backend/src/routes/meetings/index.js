const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/call', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./call'));
router.use('/answer', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./answer'));
router.use('/decline', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./decline'));
router.use('/cancel', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./cancel'));
router.use('/get', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./get'));

module.exports = router;
