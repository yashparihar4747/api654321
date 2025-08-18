const mongoose = require('mongoose');


const uri = 'mongodb+srv://yashparihar:iErrxSX8RDH8AR3k@cluster0.i2iv3xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch((err) => console.error('Connection error:', err));
};

module.exports = connectDB;