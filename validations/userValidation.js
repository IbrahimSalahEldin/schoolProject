const {body } = require("express-validator");


module.exports.loginValidations = [
   
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required')
];