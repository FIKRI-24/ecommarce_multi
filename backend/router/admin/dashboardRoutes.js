const express = require('express');
const router = express.Router();
const dashboardController = require('../../controller/admin/dashboard.controller.js');

router.get('/', dashboardController.getDashboardStats);

module.exports = router;
