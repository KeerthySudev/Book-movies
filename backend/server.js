const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passport');
const path = require('path');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const homeRoutes = require('./routes/homeRoutes.js');


const app = express();
app.use(cors()); 
app.use(express.json()); 


app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
//   cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


// Use the user routes for API endpoints
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/home', homeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB using Mongoose
const MONGODB_URI = process.env.MONGODB_URI 
// || 'mongodb://localhost:27017/book-movies'
;

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
console.log(MONGODB_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
