const express = require('express');
const router = express.Router();

//validation ;;

const { authAdmin  } = require('../middlewares/auth');

const admin=require("../controllers/users/adminController");
const student=require("../controllers/studentsController");

const upload = require("../middlewares/upload");

router.post('/',[ authAdmin ,    upload('student').single('img') ], student.create);

router.get('/', student.get);

router.put('/:id',[authAdmin , upload('student').single('img')], student.Edit);

router.delete('/:id',authAdmin ,  student.delete);


module.exports = router;
