const express = require('express');
const router = express.Router();

const {userregister ,editUser,deleteUser,getfilteredUsers} = require("../controllers/registrationController");



router.post('/register/post', userregister);

router.get('/register/get', getfilteredUsers);
router.put('/register/edit/:id', editUser);
router.delete('/register/delete/:id', deleteUser);




module.exports = router;
