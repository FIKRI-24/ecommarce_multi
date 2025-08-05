const { User, Store, Product, Order } = require('../../models');

const getDashboardStats = async (req, res) => {
  try {
    const totalUser = await User.count();
    const totalSeller = await User.count({ where: { role: 'seller' } });
    const totalBuyer = await User.count({ where: { role: 'buyer' } });
    const totalDriver = await User.count({ where: { role: 'driver' } });

    const totalStore = await Store.count();
    const totalProduct = await Product.count();
    const totalOrder = await Order.count();

    res.json({
      totalUser,
      totalSeller,
      totalBuyer,
      totalDriver,
      totalStore,
      totalProduct,
      totalOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data dashboard', error: error.message });
  }
};

module.exports = {
  getDashboardStats
};
