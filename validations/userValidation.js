const {body } = require("express-validator");
module.exports.registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('nmae is required'),
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required'),
    body('password').isLength({min:5, max:10}).withMessage('passored should by min 5 to max 10 carechtar ')
];

module.exports.loginValidations = [
   
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('passored is required')
];