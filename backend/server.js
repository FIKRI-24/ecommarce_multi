require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inisialisasi Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke database dan import model
const db = require('./models');

// Coba koneksi ke database
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database terkoneksi');
  })
  .catch(err => {
    console.error('❌ Gagal koneksi database:', err);
  });

// Sinkronisasi model ke database
db.sequelize.sync({ alter: true }) // pakai alter untuk pengembangan
  .then(() => {
    console.log('📦 Model berhasil sinkron');
  })
  .catch(err => {
    console.error('❌ Gagal sinkron model:', err);
  });

// Root route
app.get('/', (req, res) => {
  res.send('🎉 Selamat datang di E-Commerce Multi Vendor API!');
});

// Rute-rute (kamu bisa pisahkan nanti ke folder routes/)
// app.use('/api/auth', require('./routes/auth.routes')); // contoh
// app.use('/api/users', require('./routes/user.routes')); // contoh
// // Tambahkan sesuai kebutuhan: produk, toko, driver, dll

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
