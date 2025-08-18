const express = require('express');
const router = express.Router();

const { userCustomize, getAllCustomize,editCustomize,deleteCustomize } = require("../controllers/customizeController");
router.post('/customize', userCustomize);
router.get('/customize/get', getAllCustomize);
router.put('/customize/edit/:id', editCustomize); 
router.delete('/customize/delete/:id', deleteCustomize);

module.exports = router;

