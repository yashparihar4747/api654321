const express = require('express');
const router = express.Router();

const { userContact , getAllContact, editContact,deleteContact} = require("../controllers/contactController");
router.get('/contact', userContact);
router.get('/contact/get', getAllContact);
router.put('/contact/edit/:id', editContact);
router.delete('/contact/delete/:id', deleteContact);

module.exports = router;
