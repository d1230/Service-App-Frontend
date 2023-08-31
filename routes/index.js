const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRouter'));
router.use('/user', require('./userRouter'));
router.use('/category', require('./categoryRouter'));

module.exports = router;