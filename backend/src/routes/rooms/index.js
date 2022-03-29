const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/conversation', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./conversation'));
router.use('/group', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./group'));
router.use('/room', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./room'));
router.use('/list', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./list'));

module.exports = router;
