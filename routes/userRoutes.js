const express = require('express');
const router = express.Router();

//validation ;
const { loginValidations} = require("../validations/userValidation");
const { teacherValidation} = require("../validations/teacherValidation");
const { authAdmin , authTeacher } = require('../middlewares/auth');
const admin = require("../controllers/users/adminController");
// controller;
const { login} = require("../controllers/users/userController");

const upload = require("../middlewares/upload");

router.post('/',[ authAdmin ,   teacherValidation , upload('user').single('img')],admin.create);

router.put('/:id',[ authAdmin ,   teacherValidation , upload('user').single('img')], admin.Edit);

router.delete('/:id', authAdmin , admin.delete);

router.get('/get' ,authTeacher, admin.get);

router.post('/login',loginValidations, login);

module.exports =  router;

