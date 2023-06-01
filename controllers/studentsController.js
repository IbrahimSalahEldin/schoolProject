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
        return res.status(201).send("student has created successfully!");
      } else {
        return res.status(409).send("ssn already exists");
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  }


  async get(req, res) {
    // const page = req.params.page || 1;
    // const Num_Of_Student_Items = 10;
    // const skip = (page - 1) * Num_Of_Student_Items;
    // const index = page * Num_Of_Student_Items;
    // const result = {};
    try {
      // const count = await studentModule.find({}).countDocuments();
      const response = await studentModule
        .find({})
        // .skip(skip)
        // .limit(Num_Of_Student_Items)
        // .sort({ updatAt: -1 });

      // if (index < count) {
      //   result.next = { page: +page + 1, limit: Num_Of_Student_Items };
      // }
      // if (skip > 0) {
      //   result.previous = { page: page - 1, limit: Num_Of_Student_Items };
      // }
      // result.totalPages = Math.ceil(count / Num_Of_Student_Items);
      // result.totalDocyments = count;
      // result.currentPage = page;
      // result.documents = response;
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
    if (req.file || res.statusCode != 404) {
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
    // user.report = req.body.report;
    user.absent = req.body.absent;
    user.class = req.body.class;
    user.academic_year = req.body.academic_year;
    user.father_description = req.body.father_description;
    try {
      const userData = await user.save();
       ////////////  report
      if (userData.absent == 3) {
        user.report = 1;
      }else if (userData.absent == 6){
        user.report = 1;
      };

      //////////// delete any student if absent = 6 days
      if (userData.absent.length == 6) {
        await studentModule.deleteOne({ _id: id });
      };

      return res.json(userData);

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
