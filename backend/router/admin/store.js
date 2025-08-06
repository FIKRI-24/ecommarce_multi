const express = require('express');
const router = express.Router();
const storeController = require('../../controller/admin/store.controller.js');


router.get('/', storeController.getAllStores);


router.get('/:id', storeController.getStoreById);


router.post('/', storeController.createStore);


router.put('/:id', storeController.updateStore);


router.patch('/:id/status', storeController.toggleStoreStatus);


router.delete('/:id', storeController.deleteStore);

module.exports = router;
