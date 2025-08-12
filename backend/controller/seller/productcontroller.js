const { Product, Store } = require('../../models');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;

    const store = await Store.findOne({ where: { userId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store tidak ditemukan' });

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      storeId: store.id,
      userId: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store tidak ditemukan' });

    const products = await Product.findAll({
      where: {
        storeId: store.id,
        userId: req.user.id
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store tidak ditemukan' });

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        storeId: store.id,
        userId: req.user.id
      }
    });

    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store tidak ditemukan' });

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        storeId: store.id,
        userId: req.user.id
      }
    });

    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const { name, description, price, stock, image } = req.body;
    await product.update({ name, description, price, stock, image });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });
    if (!store) return res.status(404).json({ message: 'Store tidak ditemukan' });

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        storeId: store.id,
        userId: req.user.id
      }
    });

    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    await product.destroy();

    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
