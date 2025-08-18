const express = require('express');
const router = express.Router();

const { userPackages, getAllPackages,editPackages,deletePackages } = require("../controllers/packagesController");
router.post('/packages', userPackages);
router.get('/packages/get', getAllPackages);
router.put('/packages/edit/:id', editPackages); 
router.delete('/packages/delete/:id', deletePackages);

module.exports = router;

