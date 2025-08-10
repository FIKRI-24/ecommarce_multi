const { Order, OrderItem, Product, Store, User } = require('../../models');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.user.id;

    const order = await Order.create({
      userId,
      totalAmount,
      status: 'pending'
    });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) continue;

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    res.status(201).json({ message: 'Pesanan berhasil dibuat', orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat pesanan', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: {
            model: Product,
            include: Store
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil daftar pesanan', error: error.message });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price'] 
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail order', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({ where: { id, userId } });

    if (!order) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    await OrderItem.destroy({ where: { orderId: id } });
    await order.destroy();

    res.status(200).json({ message: 'Pesanan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus pesanan', error: error.message });
  }
};
