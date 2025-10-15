const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = 3000;

// Konfigurasi koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         
  password: '',         
  database: 'mahasiswa'
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    console.log('Berhasil konek ke database MySQL!');
    
  }
});

// Endpoint GET untuk ambil semua data biodata
app.get('/biodata', (req, res) => {
  const sql = 'SELECT * FROM biodata';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error ambil data:', err);
      res.status(500).json({ message: 'Gagal ambil data' });
    } else {
      res.json(results);
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
