
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
        require:true,
        unique: true
    },
    
    report:{
        type: Number,
        default:0,
    },
   
    absent: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6],
            default: 0,
    },
    class:{
        type: String,
        enum: ['first', 'second', 'third'],
        default:'first'
    },
    academic_year :{
        type:String,
        enum: ['first', 'second', 'third'],
        default:'first'

    },
    father_description:{
        type: String,
    },
    // Absence : [{type: mongoose.Schema.Types.ObjectId, ref: "Absence" }],

},{timestamp:true});

const StudentModel = mongoose.model("student", StudentSchema);
module.exports = StudentModel;