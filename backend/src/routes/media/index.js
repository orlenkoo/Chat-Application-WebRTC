const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/get-rtp-capabilities', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./getRtpCapabilities'));
router.use('/create-producer-transport', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./createProducerTransport'));
router.use('/connect-producer-transport', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./connectProducerTransport'));
router.use('/create-consumer-transport', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./createConsumerTransport'));
router.use('/connect-consumer-transport', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./connectConsumerTransport'));
router.use('/produce', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./produce'));
router.use('/consume', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./consume'));
router.use('/resume', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./resume'));
router.use('/join', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./join'));
router.use('/close', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./close'));
router.use('/stop-producer', passport.authenticate('jwt', {session: false, failureRedirect: '/api/auth/unauthorized'}, null), require('./stopProducer'));

module.exports = router;
