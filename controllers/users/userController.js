const {validationResult} = require("express-validator");
const {hashedPassword , createToken ,comparaPassword} = require("../../services/authServices");
const UserModel = require('../../models/user');
const { decode } = require("jsonwebtoken");






 module.exports.login = async  (req,res)=>{
    const { email , password} = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty) {
        try {
            const user = await UserModel.findOne({email})
            console.log(user);

            if (user) {
                
                if(await comparaPassword(password , user.password)){
                    const token =  createToken({id:user._id, name:user.name,role:user.role, email:user.email})
                    if (user.admin) {
                        return res.status(201).json({token ,admin: true} )
                    }else{
                        return res.status(201).json({token , admin : false})
                    }
                }else{
                    return res.status(401).json({errors: [{msg: 'password not matched'}]})
                }
            }else{
                return res.status(401).json({errors: [{msg: `${email} is not found!`}]})
            }

        } catch (error) {
        return res.status(500).json(`server internal error`)
            
        }
    }else{
        return res.status(401).json({errors: errors.array()})
    }
 }