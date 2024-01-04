import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

class Authentication {
    private readonly secretKey = 'myNameIsMunendraKumarKushwaha';

    public authenticate = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Response<any, Record<string, any>> | undefined => {
        const token: any = req.header('authorization');
        if (!token) {
            next();
            return;
        }
        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(
                token,
                this.secretKey,
            );
            res
                .status(200)
                .json({ message: 'Login Successful', details: decoded });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                next();
                return;
            }
            res.status(403).json({ message: error });
        }
    };
}

export default new Authentication();
