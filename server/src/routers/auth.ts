import { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema';
import nodemailer from 'nodemailer';
import checkAuthToken from '../middleware/checkAuthToken';


const router = Router();

router.post('/test', (req: Request, res: Response) => {
    res.status(201).json({message: "auth api testing done"});
}); 

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, password, city } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email: email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already exists'});
        }
        
        const newUser = new User({ email, name, password: hashedPassword, city });
        await newUser.save();
        res.status(201).json({ ok: true, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error creating user"});
    }
});


router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ userId: user._id}, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '60m'});
        // refresh token is used for regenerating the auth token so it is less vulnerable
        res.cookie('authToken', authToken,  { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.send({ok: true, message: 'Login successful', authToken, refreshToken});
    } catch (error) {
        res.status(500).json({ok: false, error: 'Error logging in' });
    } 
});

interface AuthRequest extends Request {
    userId?: string;
    ok?: boolean;
}

router.get('/checklogin', checkAuthToken, async (req: AuthRequest, res: Response) => {
    res.json({
        userId: req.userId,
        ok: true,
        message: 'User authenticated successfully'
    });
});

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    res.json({
        ok: true,
        message: 'User logout successful'
    })
})

router.get('/getuser', checkAuthToken, async (req: AuthRequest, res: Response) => {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(400).json({ok:false, message:'Invalid credentials'});
    }
    else{
        return res.status(200).json({ok: true, message: 'User found', data: user});
    }
})

router.post('/changecity', checkAuthToken, async (req: AuthRequest, res: Response) => {
    const { city } = req.body;
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(400).json({ok: false, message: 'Invalid credentials'});
    }
    else{
        user.city = city;
        await user.save();
        return res.status(200).json({ok: true, message: 'City changed successfully'});
    }
})

export default router;