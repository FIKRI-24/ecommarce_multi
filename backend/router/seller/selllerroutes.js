const express = require("express");
const router = express.Router();
const sellerController = require("../../controller/seller/sellercontroller.js");
const { authenticate, isSeller } = require("../../mideelwares/auth.js");

// Store
router.post("/store", authenticate, isSeller, sellerController.createStore);
router.get("/store", authenticate, isSeller, sellerController.getOwnStore);

// Products
router.post("/products", authenticate, isSeller, sellerController.addProduct);
router.get("/products", authenticate, isSeller, sellerController.getMyProducts);
router.put("/products/:id", authenticate, isSeller, sellerController.updateProduct);
router.delete("/products/:id", authenticate, isSeller, sellerController.deleteProduct);

// Orders
router.get("/orders", authenticate, isSeller, sellerController.getStoreOrders);

module.exports = router;
