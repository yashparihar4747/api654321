const express = require('express');
const router = express.Router();

const { usergallary, getAllGallary, editUser,deleteUser } = require("../controllers/gallaryController");
router.post('/gallary', usergallary);
router.get('/gallary/get', getAllGallary);
router.put('/gallary/edit/:id', editUser);   
router.delete('/gallary/delete/:id', deleteUser);

module.exports = router;

