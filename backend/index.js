const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/UserRoutes');
const petRoutes = require('./routes/PetRoutes');

const app = express();

// Config JSON response
app.use(express.json());

app.use(cookieParser());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

// Routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);

// Public folder for images
app.use(express.static('public'));

app.listen(5000)