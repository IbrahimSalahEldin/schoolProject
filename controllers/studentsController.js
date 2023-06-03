//validate all errors
const { validationResult } = require("express-validator");
//to define teacher/admin schema
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const studentModule = require("../models/student");

class Student {
  //create student


  async create(req, res) {
    try {
      const objuser = {
        name: req.body.name,
        img: req.file.filename,
        address: req.body.address,
        ssn: req.body.ssn,
        amountaOfBsence: req.body.amountaOfBsence,
        report: req.body.report,
        class: req.body.class,
        absent: req.body.absent,
        academic_year: req.body.academic_year,
        father_description: req.body.father_description,
      };
     

      const ssn = await studentModule.findOne({ ssn: req.body.ssn });
      if (!ssn) {
        await studentModule.create(objuser);
        console.log('====================================');
        console.log("angular.module");
        
        
        console.log('====================================');
        return res.status(201).send("student has created successfully!");
        
      } else {
        console.log('====================================');
        console.log("angular.else");
        
        console.log('====================================');
        return res.status(400).send("ssn already exists");
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  }


  async get(req, res) {

    try {
     
      const response = await studentModule
        .find({})
      return res.status(200).json(response);
    } catch (error) {
     
      return res.status(500).json(error);
    }
  }

  async getByID(req , res){
    try {
      const student = await studentModule.findOne({ _id:req.params.id });
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json(error);
    }

  }

  async Edit(req, res) {
    const id = req.params.id;
    const user = await studentModule.findById(id);
    if (user) {
            if ( req.file || res.statusCode != 404) {
              const imagePath = path.join(
                __dirname,
                "../assets/uploads/student",
                user.img
              );
              fs.unlinkSync(imagePath);
              user.img = req.file.filename;
            }

            user.name = req.body.name;
            user.address = req.body.address;
            user.ssn = req.body.ssn;
            user.amountaOfBsence = req.body.amountaOfBsence;
            user.absent = req.body.absent;
            user.class = req.body.class;
            user.academic_year = req.body.academic_year;
            user.father_description = req.body.father_description;
          }
    try {
      if(user){
        const userData = await user.save();
       
        if (userData.absent == 4) {
          user.report = 1;
        }else if (userData.absent == 8){
          user.report = 2;
        };
        if (userData.absent == 12) {
          await studentModule.deleteOne({ _id: id });
        };
  
        return res.json(userData);
      }else{
        return res.status(404).send({ message:"User not found"});
      }
     

    } catch (error) {
      return res.status(500).send(error);
    }
  }

  
  async delete(req, res) {
    try {
      const student = await studentModule.findById({_id: req.params.id});
      if (student) {
        const imagePath = path.join(
          __dirname,
          "../assets/uploads/student",
          student.img,
        );
        fs.unlinkSync(imagePath);
      }
      const resalt = await studentModule.deleteOne({ _id: req.params.id });
      return res.json(resalt);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
}
module.exports = new Student();
