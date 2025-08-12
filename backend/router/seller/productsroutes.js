const express = require('express')
const router = express.Router()
const productsController = require('../../controller/seller/productcontroller.js')
const { authenticate, isSeller } = require('../../mideelwares/auth.js')

router.post('/', authenticate, isSeller, productsController.createProduct)
router.get('/', authenticate, isSeller, productsController.getProducts)
router.get('/:id', authenticate, isSeller, productsController.getProductById)
router.put('/:id', authenticate, isSeller, productsController.updateProduct)
router.delete('/:id', authenticate, isSeller, productsController.deleteProduct)

module.exports = router
