const { User } = require('../../models');

// GET Semua Driver
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.findAll({ where: { role: 'driver' } });
    res.status(200).json({ data: drivers });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data driver', error: error.message });
  }
};

// GET Detail Driver by customId
const getDriverByCustomId = async (req, res) => {
  try {
    const driver = await User.findOne({
      where: {
        customId: req.params.customId,
        role: 'driver'
      }
    });

    if (!driver) return res.status(404).json({ message: 'Driver tidak ditemukan' });

    res.status(200).json({ data: driver });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data driver', error: error.message });
  }
};

// UPDATE Driver
const updateDriver = async (req, res) => {
  try {
    const driver = await User.findOne({
      where: {
        customId: req.params.customId,
        role: 'driver'
      }
    });

    if (!driver) return res.status(404).json({ message: 'Driver tidak ditemukan' });

    const { name, email, password } = req.body;

    if (name) driver.name = name;
    if (email) driver.email = email;
    if (password) driver.password = password;

    await driver.save();

    res.status(200).json({ message: 'Driver berhasil diupdate', data: driver });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate driver', error: error.message });
  }
};

// DELETE Driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await User.findOne({
      where: {
        customId: req.params.customId,
        role: 'driver'
      }
    });

    if (!driver) return res.status(404).json({ message: 'Driver tidak ditemukan' });

    await driver.destroy();

    res.status(200).json({ message: 'Driver berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus driver', error: error.message });
  }
};

module.exports = {
  getAllDrivers,
  getDriverByCustomId,
  updateDriver,
  deleteDriver
};
