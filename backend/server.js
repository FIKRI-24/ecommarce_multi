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


db.sequelize.sync({ alter: true }) 
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

const userRoutes = require('./router/admin/userroutes.js');
app.use('/admin/users', userRoutes);

const dashboardRoutes = require('./router/admin/dashboardRoutes.js');
app.use('/admin/dashboard', dashboardRoutes);

const driverRoutes = require('./router/admin/driverRoutes.js');
app.use ('/admin/drivers', driverRoutes);

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
