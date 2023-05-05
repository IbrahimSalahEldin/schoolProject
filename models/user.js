
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        require:true,
        type: String
    },
    img:{
        type: String,
    },
    email: {
        require:true,
        type: String
    },
    password: {
        require:true,
        type: String
    },
    role: {
        require:true,
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    }
    
},{ timestamps:true});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;