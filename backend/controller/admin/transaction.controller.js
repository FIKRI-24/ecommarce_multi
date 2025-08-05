const { Order, OrderItem, Product, User } = require('../../models');

exports.getAllTransactions = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: OrderItem, include: [Product] },
      { model: User, as: 'buyer' }
    ]
  });
  res.json(orders);
};

exports.getTransactionById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      { model: OrderItem, include: [Product] },
      { model: User, as: 'buyer' }
    ]
  });
  res.json(order);
};
