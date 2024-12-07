import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string;
    ok?: boolean;
}

function checkAuthToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(authToken, refreshToken);

    if (!authToken || !refreshToken) {
        return res.status(401).json({ message: 'Authentication failed: No authToken or refreshToken provided', ok: false });
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY as string, (err: any, decoded: { userId: any; }) => {
        if (err) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY as string, (refreshErr: any, refreshDecoded: { userId: any; }) => {
                if (refreshErr) {
                    return res.status(401).json({ message: 'Authentication failed: Both tokens are invalid', ok: false });
                } else {
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY as string, { expiresIn: '30m' });
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '60m' });

                    res.cookie('authToken', newAuthToken, { httpOnly: true });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });

                    req.userId = refreshDecoded.userId;
                    req.ok = true;
                    next();
                }
            });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
}

export default checkAuthToken;