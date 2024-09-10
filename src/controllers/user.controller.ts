import { Request, Response } from 'express';
import { pool } from '../db/db';
import { User } from './../types/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (id: number, email: string, role: string): Promise<string> => {
    //? need to promise resolve because don't work
    return new Promise((resolve, reject) => {
        jwt.sign({ id, email, role }, process.env.SECRET_KEY as string ?? "lalalend", { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token as string);
        });
    });
};

const refreshJwt = (id: number, email: string, role: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id, email, role }, process.env.SECRET_KEY as string ?? "lalalend", { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token as string);
        });
    });
};

class UserController {
    async registration(req: Request<Record<string, never>, unknown, User>, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
            await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async login(req: Request<Record<string, never>, unknown, User>, res: Response) {
        const { email, password } = req.body;

        // Check for missing fields and return immediately
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Fetch user by email
            const user = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);

            // Check if user exists
            if (user.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email' });
            }

            // Compare passwords asynchronously
            const comparePassword = await bcrypt.compare(password, user.rows[0].password);
            if (!comparePassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            console.log(user, "users");

            // Generate JWT
            const token = await generateJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role);
            const refreshToken = await refreshJwt(user.rows[0].id, user.rows[0].email, user.rows[0].role);
            return res.json({
                access: token,
                refresh: refreshToken,
                success: true
            });

        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}

export default UserController;
