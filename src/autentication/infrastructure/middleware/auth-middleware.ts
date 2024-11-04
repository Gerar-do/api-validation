import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "supersecretkey";
export const SECRET_KEY: Secret = secretKey;

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

export const authMiddleware = () => {
return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
    return res.status(401).json({ message: 'Token no encontrado' });
    }

    try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    (req as CustomRequest).user = decoded;
    next();
    } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
    }
};
};