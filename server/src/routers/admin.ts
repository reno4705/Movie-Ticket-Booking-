import { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/AdminSchema';
import checkAdminToken from '../middleware/checkAdminToken';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await Admin.findOne({ email: email});
        if (existingUser) {
            return res.status(400).json({message: 'Admin email already exists'});
        }
        
        const newUser = new Admin({ email, name, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const adminAuthToken = jwt.sign({ userId: user._id }, process.env.JWT_ADMIN_SECRET_KEY, { expiresIn: '30m' });
        // refresh token is used for regenerating the auth token so it is less vulnerable
        res.cookie('adminAuthToken', adminAuthToken,  { httpOnly: true });
        res.send({ message: 'Login successful', ok: true, adminAuthToken});
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

interface AuthRequest extends Request {
    userId?: string;
    ok?: boolean;
}

router.get('/checklogin', checkAdminToken, async (req: AuthRequest, res: Response) => {
    res.json({
        userId: req.userId,
        ok: true,
        message: 'User authenticated successfully',
    });
});

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie('adminAuthToken');
    res.json({
        ok: true,
        message: 'User logout successful'
    })
})

export default router;