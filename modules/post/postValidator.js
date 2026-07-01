const {
    body,
    validationResult
} = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const firstError =
        errors.array()[0].msg;

    const error = new Error(firstError);

    error.status = 400;
    error.errors = errors.array();

    throw error;
};

exports.createPostValidator = [

    body("title")
        .notEmpty()
        .withMessage(
            "O título é obrigatório."
        )
        .trim(),

    body("content")
        .notEmpty()
        .withMessage(
            "O conteúdo da postagem é obrigatório."
        )
        .trim(),

    validate
];