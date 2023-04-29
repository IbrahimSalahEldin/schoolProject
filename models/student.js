
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name:{
        require:true,
        type: String
    },
    img:{
        type: String,
    },
    address:{
        type: String,
        require:true
    },
    ssn:{
        type: String,
        require:true
    },
    amountaOfBsence:{
        type: Number
    },
    report:{
        type: Number,
    },
    class:{
        enum: ['first', 'second', 'third'],
        default:['fisrt'] 
    },
    academic_year :{
        enum: ['first', 'second', 'third'],
        default:['fisrt'] 

    },
    father_description:{
        type: String,
    },
    Absence : [{type: mongoose.Schema.Types.ObjectId, ref: "Absence" }],

},{timestamp:true});

const StudentModel = mongoose.model("student", StudentSchema);
module.exports = StudentModel;