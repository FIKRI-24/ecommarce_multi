const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Lihat profil pembeli
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'customId', 'name', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Profil berhasil diambil', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil profil', error: error.message });
  }
};

// Update profil
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ message: 'Profil berhasil diperbarui', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui profil', error: error.message });
  }
};

// Ubah password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password lama salah' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: 'Password berhasil diubah' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah password', error: error.message });
  }
};
