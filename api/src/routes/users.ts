import { createUser, getUserByEmail } from '../controllers/users';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/user', createUser);

userRoutes.post('/login', getUserByEmail)

export default userRoutes;