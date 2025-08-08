const { Store, Product, Order, User } = require("../../models");

// 1. Seller membuat atau mengelola toko
exports.createStore = async (req, res) => {
  try {
    const { customId, name, description, logo } = req.body;
    const userId = req.userId;

    const existingStore = await Store.findOne({ where: { userId } });
    if (existingStore) return res.status(400).json({ msg: "Toko sudah ada" });

    const store = await Store.create({
      customId,
      name,
      description,
      logo,
      userId,
      status: "pending"
    });

    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 2. Melihat detail toko sendiri
exports.getOwnStore = async (req, res) => {
  try {
    const userId = req.userId;
    const store = await Store.findOne({ where: { userId } });
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 3. Menambahkan produk
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock, description, image } = req.body;
    const userId = req.userId;

    const store = await Store.findOne({ where: { userId } });
    if (!store) return res.status(404).json({ msg: "Toko tidak ditemukan" });

    const product = await Product.create({
      storeId: store.id,
      name,
      price,
      stock,
      description,
      image
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 4. Melihat semua produk miliknya
exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const store = await Store.findOne({ where: { userId } });
    if (!store) return res.status(404).json({ msg: "Toko tidak ditemukan" });

    const products = await Product.findAll({ where: { storeId: store.id } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 5. Edit produk
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, image } = req.body;
    const userId = req.userId;
    const { id } = req.params;

    const store = await Store.findOne({ where: { userId } });
    const product = await Product.findOne({ where: { id, storeId: store.id } });

    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    product.name = name;
    product.price = price;
    product.stock = stock;
    product.description = description;
    product.image = image;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 6. Hapus produk
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const store = await Store.findOne({ where: { userId } });
    const product = await Product.findOne({ where: { id, storeId: store.id } });

    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    await product.destroy();
    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 7. Melihat daftar pesanan masuk ke tokonya
exports.getStoreOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const store = await Store.findOne({ where: { userId } });

    const orders = await Order.findAll({
      where: { storeId: store.id },
      include: [User]
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
