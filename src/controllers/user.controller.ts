import { Request, Response } from 'express';
import { pool } from '../db/db';
import { User } from './../types/user';

class UserController {
    async registration(req:  Request<Record<string, never>, unknown, User>, res: Response) {
        const { email, password ,id,role} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await pool.query('INSERT INTO user (email, password) VALUES ($1, $2)', [email, password]);
        return res.status(201).json({ message: 'User created successfully' });
       
    }
}

export default UserController;
