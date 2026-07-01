const {
    body,
    validationResult
} = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const firstError = errors.array()[0].msg;

    return res.status(400).json({
        message: firstError,
        errors: errors.array()
    });
};

exports.createCommentValidator = [

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Comentário não pode ser vazio."),

    validate
];