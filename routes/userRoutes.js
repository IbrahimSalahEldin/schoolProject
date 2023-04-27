const express = require('express');
const router = express.Router();

//validation ;;
const { loginValidations} = require("../validations/userValidation")
// controller;;
const { login} = require("../controllers/users/userController");



  
router.post('/login',loginValidations, login);



module.exports =  router;