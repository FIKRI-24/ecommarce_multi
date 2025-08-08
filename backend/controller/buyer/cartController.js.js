const { CartItem, Product, User } = require('../../models');

exports.addToCart = async (req, res) => {
  try {
    if (req.user.role !== 'buyer') return res.status(403).json({ message: 'Akses hanya untuk pembeli' });

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const existingItem = await CartItem.findOne({ where: { userId, productId } });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: 'Jumlah produk ditambah', data: existingItem });
    }

    const newItem = await CartItem.create({ userId, productId, quantity });
    res.status(201).json({ message: 'Produk ditambahkan ke keranjang', data: newItem });

  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan ke keranjang', error });
  }
};

exports.getCart = async (req, res) => {
  try {
    if (req.user.role !== 'buyer') return res.status(403).json({ message: 'Akses hanya untuk pembeli' });

    const userId = req.user.id;

    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product }]
    });

    res.json({ message: 'Isi keranjang', data: cartItems });

  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil keranjang', error });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    if (req.user.role !== 'buyer') return res.status(403).json({ message: 'Akses hanya untuk pembeli' });

    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(cartItemId);

    if (!item || item.userId !== req.user.id) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    item.quantity = quantity;
    await item.save();
    res.json({ message: 'Jumlah item diperbarui', data: item });

  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui item', error });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    if (req.user.role !== 'buyer') return res.status(403).json({ message: 'Akses hanya untuk pembeli' });

    const { cartItemId } = req.params;
    const item = await CartItem.findByPk(cartItemId);

    if (!item || item.userId !== req.user.id) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    await item.destroy();
    res.json({ message: 'Item dihapus dari keranjang' });

  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus item', error });
  }
};

exports.clearCart = async (req, res) => {
  try {
    if (req.user.role !== 'buyer') return res.status(403).json({ message: 'Akses hanya untuk pembeli' });

    const userId = req.user.id;
    await CartItem.destroy({ where: { userId } });

    res.json({ message: 'Keranjang dikosongkan' });

  } catch (error) {
    res.status(500).json({ message: 'Gagal mengosongkan keranjang', error });
  }
};
