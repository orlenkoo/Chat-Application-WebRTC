const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/events', require('./events'));
router.use('/meetings', require('./meetings'));
router.use('/messages', require('./messages'));
router.use('/stats', require('./stats'));
router.use('/rooms', require('./rooms'));
router.use('/media', require('./media'));
router.use('/users', require('./users'));
router.use('/vault', require('./vault'));
router.use('/info', require('./info'));
router.use('/notifications', require('./notifications'));

module.exports = router;
