import { createUser, getUserByEmail, validateToken } from '../controllers/users';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/register', createUser);

userRoutes.post('/login', getUserByEmail)

userRoutes.get('/profile', validateToken)

export default userRoutes;