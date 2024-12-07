import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AdminRequest extends Request {
    adminId?: string;
}

function checkAdminToken(req: AdminRequest, res: Response, next: NextFunction) {
    const adminAuthToken = req.cookies.adminAuthToken;
    console.log(adminAuthToken);

    if (!adminAuthToken) {
        return res.status(401).json({
            message: 'Admin authentication failed: No adminAuthToken provided',
            ok: false,
        });
    }

    jwt.verify(adminAuthToken, process.env.JWT_ADMIN_SECRET_KEY as string, (err, decoded: any) => {
        if (err) {
            console.error('Admin authentication failed: Invalid adminAuthToken', err);
            return res.status(401).json({
                message: 'Admin authentication failed: Invalid adminAuthToken',
                ok: false,
            });
        } else {
            console.log('Admin authentication successful');
            // admin auth token is valid, continue with the request
            req.adminId = decoded.adminId;
            next();
        }
    });
}

export default checkAdminToken;