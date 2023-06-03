//validate all errors
const { validationResult } = require("express-validator");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userModule = require("../../models/user");

class admin {
  async create(req, res) {
    const errResEmail={message:'User Already Exist'}
    try {
      const objuser = {
        name: req.body.name,
        img: req.file.filename,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        token: req.body.token,
      };
      console.log("asd");
      const email = await userModule.findOne({ email: req.body.email });
      if (!email) {
        await userModule.create(objuser);
        return res.status(201).send("User has created successfully!");
      } else {
        return res.status(409).send(errResEmail);
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async get(req, res) {

    try {

      const response = await userModule
        .find({})
   
      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error);
    }
  }

  async Edit(req, res) {
    const id = req.params.id;
    const user = await userModule.findById(id);
    if (user) {
          if (req.file || res.statusCode != 404) {
            const imagePath = path.join(
              __dirname,
              "../../assets/uploads/user",
              user.img
            );
            fs.unlinkSync(imagePath);
            console.log(imagePath);
            user.img = req.file.filename;
          }

          user.name = req.body.name;
          user.email = req.body.email;
          user.password = req.body.password;
          user.role = req.body.role;
          user.token = req.body.token;
        }
    try {
      if(user){
      const userData = await user.save();
      return res.json(userData);
    }else{
      return res.status(404).send({ message:"User not found"});
    }
    } catch (error) {
      console.log(error);
     return res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      const user = await userModule.findById({_id: req.params.id});
      const imagePath = path.join(
        __dirname,
        "../../assets/uploads/user",
        user.img,
        
      );
      // fs.unlinkSync(imagePath);
      
      const resalt = await userModule.deleteOne({ _id: req.params.id });
      return res.json(resalt);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
module.exports = new admin();
