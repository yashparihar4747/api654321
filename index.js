const express = require('express');
const connectDB = require('./Server/connection');
require("dotenv").config();
const path = require('path');
const cors = require("cors");


const app = express();
const PORT = process.env.MONGO_PORT || 5000;

app.use(express.json());
app.use(cors());
const registerUser = require('./Routes/registerRoutes');
const loginUser = require('./Routes/loginRoutes');
const feedbackUser = require('./Routes/feedbackRoutes');
const contactUser = require('./Routes/contactRoutes');
const gallaryUser = require('./Routes/gallaryRoutes');
const cartsUser = require('./Routes/cartsRoutes');
const packagesUser = require('./Routes/packagesRoutes');
const customizeUser = require('./Routes/customizeRoutes');
const { MONGO_CLIENT_EVENTS } = require('mongodb');


app.get('/', (req, res) => {
  res.send('Welcome to World API');
});

app.use('/api/user',registerUser);
app.use('/api/user',loginUser);
app.use('/api/user',feedbackUser);
app.use('/api/user',contactUser);
app.use('/api/user',gallaryUser);
app.use('/api/user',cartsUser);
app.use('/api/user',packagesUser);
app.use('/api/user',customizeUser);


connectDB();

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});