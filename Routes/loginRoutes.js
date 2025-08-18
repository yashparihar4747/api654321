const express = require('express');
const router = express.Router();

const { userlogin ,getAllLogin ,editlogin,deletelogin  } = require("../controllers/loginController");
router.post('/login', userlogin);
router.get('/login/get', getAllLogin);
router.put('/login/edit/:id', editlogin);   
router.delete('/login/delete/:id', deletelogin);

module.exports = router;
