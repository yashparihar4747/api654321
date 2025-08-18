const express = require('express');
const router = express.Router();

const { userCarts, getAllCarts,editCart,deleteCart } = require("../controllers/cartsController");
router.post('/carts', userCarts);
router.get('/carts/get', getAllCarts);
router.put('/carts/edit/:id', editCart); 
router.delete('/carts/delete/:id', deleteCart);

module.exports = router;

