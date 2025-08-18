const mongoose = require('mongoose');
const Place = require('./Model/gallary'); // model import

// MongoDB Atlas connection string
mongoose.connect('mongodb+srv://yashparihar:iErrxSX8RDH8AR3k@cluster0.i2iv3xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const placesData =
[
  {
    "id": "1",
    "title": "Amber Fort, Jaipur",
    "image": "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
    "category": "forts"
  },
  {
    "id": 2,
    "title": "Lake Pichola, Udaipur",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    "category": "lakes"
  },
  {
    "id": 3,
    "title": "Jaisalmer Fort",
    "image": "https://images.unsplash.com/photo-1583391733954-85d7c7a3c8c4",
    "category": "forts"
  },
  {
    "id": 4,
    "title": "Pushkar Camel Fair",
    "image": "https://images.unsplash.com/photo-1602407294556-6be5f00d89bd",
    "category": "culture"
  },
  {
    "id": 5,
    "title": "Mehrangarh Fort, Jodhpur",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    "category": "forts"
  },
  {
    "id": 6,
    "title": "Ranthambore Tiger",
    "image": "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
    "category": "wildlife"
  },
  {
    "id": 7,
    "title": "Dilwara Temples, Mount Abu",
    "image": "https://images.unsplash.com/photo-1602407294556-6be5f00d89bd",
    "category": "temples"
  },
  {
    "id": 8,
    "title": "Sam Sand Dunes, Jaisalmer",
    "image": "https://images.unsplash.com/photo-1600675863011-d1199a6e92d0",
    "category": "desert"
  }
]



Place.insertMany(placesData)
  .then(() => {
    console.log("✅ Places inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Error inserting places:", err);
    mongoose.connection.close();
  });
