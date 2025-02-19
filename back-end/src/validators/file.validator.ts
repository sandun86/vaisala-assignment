import Joi from 'joi';
import { HTTP_CODES } from '../config/variables';
import { Request, Response, NextFunction } from 'express';

export const fileUploadSchema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string()
        .valid("application/json")
        .required()
        .messages({
            "any.only": "Only JSON files are allowed.",
        }),
    size: Joi.number()
        .max(2 * 1024 * 1024) // Max 2MB
        .required()
        .messages({
            "number.max": "File size must be less than 2MB.",
        }),
});

// Middleware to validate the request data
const fileValidator = {
    uploadRequest: (req: Request, res: Response, next: NextFunction) => {
        console.log('Upload validation');
        const { error } = fileUploadSchema.validate(req.file, { abortEarly: false, allowUnknown: true });//Ignore Unknown Fields
        if (error) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.details[0].message });
            return;
        }
        next();
    }
}

export default fileValidator;
