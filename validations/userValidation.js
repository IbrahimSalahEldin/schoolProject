const {body } = require("express-validator");
// module.exports.registerValidations = [
//     body('name').not().isEmpty().trim().escape().withMessage('name is required'),
//     body('email').isEmail().normalizeEmail().trim().withMessage('email is required'),
//     body('password').isLength({min:5, max:10}).withMessage('password should by min 5 to max 10 character ')
// ];

module.exports.loginValidations = [
   
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required')
];