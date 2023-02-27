const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/UserRoutes');
const petRoutes = require('./routes/PetRoutes');

const app = express();

// Config JSON response
app.use(express.json());

app.use(cookieParser());

// Solve CORS
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL}));
app.use((res, req, next) => {
  res.headers('Access-Control-Allow-Origin', '*');
  app.use(cors());
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);

// Public folder for images
app.use(express.static('public'));

app.listen(5000)