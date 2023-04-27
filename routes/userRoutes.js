const express = require('express');
const router = express.Router();

//validation ;;
const {registerValidations , loginValidations} = require("../validations/userValidation")
// controller;;
const {register, login} = require("../controllers/users/userController");




// 123456789

// router.post("/register", registerValidations, register);

  
router.post('/login',loginValidations, login);



  module.exports =  router;