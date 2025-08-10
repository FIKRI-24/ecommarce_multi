const express = require('express');
const router = express.Router();
const orderController = require('../../controller/buyer/orderController.js');
const { authenticate } = require('../../mideelwares/auth.js'); // ✅ perbaiki nama folder dan destrukturisasi

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, orderController.getOrders);
router.get('/:id', authenticate, orderController.getOrderDetail);
router.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = router;
