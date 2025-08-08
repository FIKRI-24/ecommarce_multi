const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();




const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const allowedRoles = ['buyer', 'penjual', 'driver', 'admin'];
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

// ✅ LOGIN dengan verifikasi password dan JWT
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

    // Tambahkan redirect berdasarkan role
    let redirectTo = "";
    if (user.role === "admin") redirectTo = "/admin/dashboard";
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


// ✅ CREATE user dengan role: buyer, seller, driver, admin
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const allowedRoles = ['buyer', 'penjual', 'driver', 'admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah digunakan' });
    }

    const customId = await generateCustomId(role);
    const hashedPassword = await bcrypt.hash(password, 10); // 🔧 Tambahkan ini

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
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat user', error: error.message });
  }
};

// ambil semua users per roleee
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: 'Data user ditemukan', data: users });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error });
  }
};

// ambil per id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ message: 'Detail user ditemukan', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail user', error });
  }
};

// edit 
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: 'User berhasil diperbarui', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui user', error });
  }
};

// ✅ DELETE user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus user', error });
  }
};

const generateCustomId = async (role) => {
  const prefixMap = {
    superadmin: 'ADM',
    penjual: 'SEL',
    pembeli: 'BUY',
    driver: 'DRV'
  };

  const prefix = prefixMap[role] || 'USR';
  const count = await User.count({ where: { role } });
  const customId = `${prefix}${String(count + 1).padStart(4, '0')}`;
  return customId;
};

const getUserByCustomId = async (req, res) => {
  try {
    const { customId } = req.params;

    const user = await User.findOne({ where: { customId } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil user', error: error.message });
  }
};

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
