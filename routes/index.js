const express = require("express");
const authRoutes = require('./auth.routes');
const apiRoutes = require('./api.routes');
const jwt = require('../helpers').jwt;

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/api', (req, res, next) => jwt.verify(req, res, next), apiRoutes);

module.exports = router;
