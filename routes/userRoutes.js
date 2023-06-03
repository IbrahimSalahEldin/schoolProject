const express = require('express');
const router = express.Router();

//validation ;

const { teacherValidation} = require("../validations/teacherValidation");
const { authAdmin  } = require('../middlewares/auth');
const admin = require("../controllers/users/adminController");



const upload = require("../middlewares/upload");

router.post('/',[  teacherValidation , upload('user').single('img')],admin.create);

router.put('/:id',[    teacherValidation , upload('user').single('img')], admin.Edit);

router.delete('/:id',  admin.delete);

router.get('/' , admin.get);

/////////////////////////  login function

const jwt = require('jsonwebtoken');
const userModel = require ('../models/user');
const TOKEN_KEY =process.env.TOKEN_KEY || "ITI"

  router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
     
      const { email, password } = req.body;
      console.log(email);
      console.log(password);
  
      // Validate user input
      if (!(email && password)) {
       return res.status(400).send("All input is required");
      }
      
      // Validate if user exist in our database
      const user = await userModel.findOne({ email:email });
     
      // console.log(user); 
      console.log(password);
      console.log(user.password);
      if (user && (password== user.password)) {
       
        // Create token
        const token =  jwt.sign(
          {user},
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
        // user   
        // const response={message:'success',token:user.token}
       return res.status(200).json(user);
      }
      const errResponse = {message:'passwoer or email is invalid'}
      return res.status(400).send(errResponse);
    } catch (err) {

          return res.status(500).send(err);

    }
  });

    module.exports = router ; 