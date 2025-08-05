const express = require('express');
const router = express.Router();
const driverController = require('../../controller/admin/driver.controller.js');

router.get('/', driverController.getAllDrivers);
router.get('/:customId', driverController.getDriverByCustomId);
router.put('/:customId', driverController.updateDriver);
router.delete('/:customId', driverController.deleteDriver);

module.exports = router;
