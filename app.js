const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Session middleware
app.use(session({
  secret: 'yourSecretKey', // Ganti dengan secret key yang lebih aman
  resave: false,
  saveUninitialized: true,
}));

// Routes
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth'); // Menambahkan route auth

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes); // Menambahkan route auth untuk login/logout

// Dashboard Route
app.get('/', (req, res) => {
  // Pastikan user sudah login dengan memeriksa req.session.username
  if (req.session.username) {
    res.render('dashboard', { username: req.session.username });
  } else {
    res.redirect('/auth/login');  // Jika tidak login, arahkan ke login
  }
});


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
