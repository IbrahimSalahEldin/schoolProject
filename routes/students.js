const express = require('express');
const router = express.Router();

//validation ;;

const { authAdmin , authTeacher } = require('../middlewares/auth');

const admin=require("../controllers/users/adminController");
const student=require("../controllers/studentsController");

const upload = require("../middlewares/upload");

router.post('/',[authAdmin ,   upload('userProfil').single('photo') ], student.create);

router.get('/',authTeacher, admin.get);


router.put('/id/',[authAdmin , upload('userProfil').single('photo')], student.Edit);

router.delete('/:id',authAdmin , student.delete);


module.exports =  router;
