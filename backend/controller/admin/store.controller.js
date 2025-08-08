const { Store, User, Product } = require('../../models');

// 🔍 Ambil semua toko
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: {
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email', 'customId']
      }
    });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil daftar toko', error });
  }
};

// 🔎 Ambil toko berdasarkan ID


exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email', 'customId']
        },
        {
          model: Product,
          as: 'products'
        }
      ]
    });

    if (!store) {
      return res.status(404).json({ message: 'Toko tidak ditemukan' });
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('❌ Error getStoreById:', error);
    res.status(500).json({ message: 'Gagal mengambil detail toko', error: error.message });
  }
};


// ✅ Buat toko berdasarkan customId user
exports.createStore = async (req, res) => {
  try {
    const { customId, name, description, logo } = req.body;

    const user = await User.findOne({ where: { customId, role: 'penjual' } });
    if (!user) return res.status(404).json({ message: 'User dengan customId tidak ditemukan' });

    const existingStore = await Store.findOne({ where: { userId: user.id } });
    if (existingStore) return res.status(400).json({ message: 'User ini sudah memiliki toko' });

    const newStore = await Store.create({
      name,
      description,
      logo,
      userId: user.id
    });

    res.status(201).json({ message: 'Toko berhasil dibuat', data: newStore });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat toko', error: error.message });
  }
};

// ✅ Perbarui data toko
exports.updateStore = async (req, res) => {
  try {
    const { name, description, status, logo } = req.body;
    const store = await Store.findByPk(req.params.id);

    if (!store) return res.status(404).json({ message: 'Toko tidak ditemukan' });

    store.name = name || store.name;
    store.description = description || store.description;
    store.status = status || store.status;
    store.logo = logo || store.logo;

    await store.save();

    res.status(200).json({ message: 'Toko berhasil diperbarui', data: store });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui toko', error });
  }
};

// ✅ Ubah status toko (approve/suspend)
exports.toggleStoreStatus = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: 'Toko tidak ditemukan' });

    store.status = store.status === 'approved' ? 'suspended' : 'approved';
    await store.save();

    res.status(200).json({ message: `Status toko diubah menjadi ${store.status}`, data: store });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah status toko', error });
  }
};

//  Hapus toko
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: 'Toko tidak ditemukan' });

    await store.destroy();
    res.status(200).json({ message: 'Toko berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus toko', error });
  }
};

exports.updateStoreStatus = async (req, res) => {
  try {
    const { id } = req.params;         
    const { status } = req.body;      

    
    const allowedStatus = ['pending', 'approved', 'suspended'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Toko tidak ditemukan' });
    }

    
    store.status = status;
    await store.save();

    res.json({ message: 'Status toko berhasil diubah', data: store });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah status toko', error: error.message });
  }
};
