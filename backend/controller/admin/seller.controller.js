const { User } = require('../../models');

exports.getAllSellers = async (req, res) => {
  const sellers = await User.findAll({ where: { role: "penjual" } });
  res.json(sellers);
};

exports.getSellerById = async (req, res) => {
  const seller = await User.findOne({ where: { id: req.params.id, role: "penjual" } });
  res.json(seller);
};

exports.updateSeller = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  await User.update({ name, email }, { where: { id, role: "penjual" } });
  res.json({ message: "Penjual diperbarui" });
};

exports.deleteSeller = async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id, role: "penjual" } });
  res.json({ message: "Penjual dihapus" });
};
