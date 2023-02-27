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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);

// Public folder for images
app.use(express.static('public'));

app.listen(5000)