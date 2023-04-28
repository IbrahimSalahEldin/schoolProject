
const mongoose = require('mongoose');

const AbsenceSchema = mongoose.Schema({
    
    date:{type: Date, default: new Date()},
    students : {type: mongoose.Schema.Types.ObjectId, ref: "student" },
   
});

const AbsenceModel = mongoose.model("Absence", AbsenceSchema);
module.exports = AbsenceModel;