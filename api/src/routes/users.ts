import { crearUsuario } from '../controllers/users';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/user', crearUsuario);

export default userRoutes;