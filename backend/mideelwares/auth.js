const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });

    req.user = user;
    req.userId = user.id;
    next();
  });
};

const isSeller = (req, res, next) => {
  if (req.user.role !== "penjual") {
    return res.status(403).json({ message: "Akses khusus penjual" });
  }
  next();
};

module.exports = { authenticate, isSeller };
