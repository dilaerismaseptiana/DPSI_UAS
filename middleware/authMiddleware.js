const jwt = require('jsonwebtoken'); // Implementasi JWT
require('dotenv').config(); // Memuat variabel lingkungan dari .env

// Middleware untuk mengautentikasi token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']; // Mengambil token dari header Authorization
  if (!token) return res.sendStatus(401); // Jika tidak ada token, kembalikan status 401 (Unauthorized)

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Jika token tidak valid, kembalikan status 403 (Forbidden)
    req.user = user; // Menyimpan informasi pengguna ke objek req
    next(); // Melanjutkan ke middleware atau handler berikutnya
  });
};

module.exports = authenticateToken; // Mengekspor middleware untuk digunakan di rute lain
