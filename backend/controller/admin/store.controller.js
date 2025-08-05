const { Store } = require('../../models');

exports.getAllStores = async (req, res) => {
  const stores = await Store.findAll();
  res.json(stores);
};

exports.getStoreById = async (req, res) => {
  const store = await Store.findByPk(req.params.id);
  res.json(store);
};

exports.deleteStore = async (req, res) => {
  await Store.destroy({ where: { id: req.params.id } });
  res.json({ message: "Toko dihapus" });
};
