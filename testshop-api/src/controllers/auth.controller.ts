import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, UserInput } from '../models/user.model';

export class AuthController {
  
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('REGISTER ENDPOINT CALLED');
    console.log('Request body:', req.body);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    try {
      const { username, email, password } = req.body;
      console.log('Extracted data:', { username, email, password: '***' });
      
      if (!username || !email || !password) {
        console.log('Missing required fields');
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
      }

      console.log('Checking if user exists...');
      const existingUser = await UserModel.findByUsername(username);
      console.log('Existing user:', existingUser ? 'FOUND' : 'NOT FOUND');
      
      if (existingUser) {
        res.status(400).json({ message: 'Username already exists' });
        return;
      }

      const existingEmail = await UserModel.findByEmail(email);
      if (existingEmail) {
        res.status(400).json({ message: 'Email already exists' });
        return;
      }

      console.log('Creating user...');
      const userData: UserInput = { username, email, password };
      const user = await UserModel.create(userData);
      console.log('User created successfully');

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: 'Please provide username and password' });
        return;
      }

      const user = await UserModel.findByUsername(username);
      if (!user || !(await UserModel.comparePassword(password, user.password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const user = await UserModel.findById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Server error getting profile' });
    }
  }
}