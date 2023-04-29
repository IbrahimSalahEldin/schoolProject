const express = require('express');
const router = express.Router();

//validation ;;
const { loginValidations} = require("../validations/userValidation");
const { teacherValidation} = require("../validations/teacherValidation");
const admin=require("../controllers/users/adminController");
// controller;;
const { login} = require("../controllers/users/userController");
router.post('/create_teacher',[teacherValidation],admin.createTeacher);
router.post('/create_student',admin.createStudent);
router.get('/get_teacher',admin.getTeacher);
router.get('/get_student',admin.getStudent);
router.post('/login',loginValidations, login);



module.exports =  router;