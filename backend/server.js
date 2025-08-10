require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inisialisasi Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database terkoneksi");
  })
  .catch((err) => {
    console.error("❌ Gagal koneksi database:", err);
  });


// db.sequelize.sync({ alter: true }) 
//   .then(() => {
//     console.log('📦 Model berhasil sinkron');
//   })
//   .catch(err => {
//     console.error('❌ Gagal sinkron model:', err);
//   });

// Root route
app.get("/", (req, res) => {
  res.send("🎉 Selamat datang di E-Commerce Multi Vendor API!");
});

const userRoutes = require("./router/admin/userroutes.js");
app.use("/admin/users", userRoutes);

const dashboardRoutes = require("./router/admin/dashboardRoutes.js");
app.use("/admin/dashboard", dashboardRoutes);

const driverRoutes = require("./router/admin/driverRoutes.js");
app.use("/admin/drivers", driverRoutes);

const storeRoutes = require("./router/admin/store.js");
app.use("/admin/stores", storeRoutes);

const sellerRoutes = require('./router/seller/selllerroutes.js');
app.use('/seller', sellerRoutes);

const buyerRoutes = require('./router/buyer/orderRoutes.js');
app.use('/buyer/orders', buyerRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
