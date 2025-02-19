import Joi from 'joi';
import { HTTP_CODES } from '../config/variables';
import { Request, Response, NextFunction } from 'express';

// Convert Currency
const convertCurrencySchema = Joi.object({
    base_currency: Joi.string().min(3).required(),
    quote_currency: Joi.string().min(3).required(),
    amount: Joi.number().required(),
});

// Middleware to validate request body
const currencyValidator = {
    validateConvertCurrencyRequest: (req: Request, res: Response, next: NextFunction) => {
        const { error } = convertCurrencySchema.validate(req.query);
        if (error) {
            res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.details[0].message, data: { convertedAmount: 0 } } );
            return;
        }
        next();
    }
}

export default currencyValidator;
