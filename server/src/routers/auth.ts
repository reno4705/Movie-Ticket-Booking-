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

// Forgot Password
router.post("/forgot-password", async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "20m" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'benedictreno47@gmail.com',
                pass: 'jlwh dhbn qyez hxsd'
            }
        });

        const resetLink = `http://localhost:3000/reset_password/${user._id}/${token}`;
        const mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Password Reset Link',
            text: `Please use the following link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ message: "Reset password email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error in forgot-password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Reset Password
router.post("/reset-password/:id/:token", async (req: Request, res: Response) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(id, { password: hashedPassword });

        return res.status(200).json({ ok:true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error in reset-password:", error);
        return res.status(400).json({ ok:false, message: "Invalid or expired token" });
    }
});

export default router;