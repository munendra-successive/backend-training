import { type NextFunction, type Request, type Response } from 'express';
import JoiSchema from '../schema/joiSchema';

class Validation {
    static validate = (req: Request, res: Response, next: NextFunction): any => {
        const { error } = JoiSchema.register().validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ message: 'Validation error', details: error.details });
        }
        next();
        return undefined;
    };
}

export default Validation;
