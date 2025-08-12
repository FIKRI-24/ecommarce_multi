const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 🔹 Generate Custom ID berdasarkan role & last record
const generateCustomId = async (role) => {
  const prefixMap = {
    superadmin: 'ADM',
    penjual: 'SEL',
    pembeli: 'BUY',
    driver: 'DRV'
  };

  const prefix = prefixMap[role] || 'USR';

  // Ambil user terakhir dengan role itu, urutkan descending
  const lastUser = await User.findOne({
    where: { role },
    order: [['customId', 'DESC']]
  });

  let lastNumber = 0;
  if (lastUser && lastUser.customId) {
    lastNumber = parseInt(lastUser.customId.replace(prefix, ''), 10);
  }

  return `${prefix}${String(lastNumber + 1).padStart(4, '0')}`;
};

// 🔹 REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = ['pembeli', 'penjual', 'driver', 'superadmin'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customId = await generateCustomId(role);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      customId
    });

    res.status(201).json({
      message: 'User berhasil didaftarkan',
      data: {
        id: newUser.id,
        customId: newUser.customId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendaftar user', error: error.message });
  }
};

// 🔹 LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id: user.id, role: user.role, customId: user.customId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    let redirectTo = "";
    if (user.role === "superadmin") redirectTo = "/admin/dashboard";
    else if (user.role === "penjual") redirectTo = "/seller/store";
    else if (user.role === "pembeli") redirectTo = "/buyer/home";
    else if (user.role === "driver") redirectTo = "/driver/dashboard";

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        customId: user.customId,
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirectTo
    });

  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};

// 🔹 CREATE user (hanya admin bisa pakai ini)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = ['pembeli', 'penjual', 'driver', 'superadmin'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah digunakan' });
    }

    const customId = await generateCustomId(role);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      customId,
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'User berhasil dibuat',
      data: {
        id: newUser.id,
        customId: newUser.customId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat user', error: error.message });
  }
};

// 🔹 GET semua user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ message: 'Data user ditemukan', data: users });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: error.message });
  }
};

// 🔹 GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ message: 'Detail user ditemukan', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail user', error: error.message });
  }
};

// 🔹 UPDATE user
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const allowedRoles = ['pembeli', 'penjual', 'driver', 'superadmin'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role;

    await user.save();
    res.status(200).json({ message: 'User berhasil diperbarui', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui user', error: error.message });
  }
};

// 🔹 DELETE user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus user', error: error.message });
  }
};

// 🔹 GET by customId
const getUserByCustomId = async (req, res) => {
  try {
    const { customId } = req.params;
    const user = await User.findOne({
      where: { customId },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil user", error: error.message });
  }
};

// 🔹 LOGOUT
const logoutUser = async (req, res) => {
  res.status(200).json({ message: 'Logout berhasil.' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  generateCustomId,
  getUserByCustomId,
  registerUser,
  loginUser,
  logoutUser
};
