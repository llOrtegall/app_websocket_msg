import { Request, Response } from 'express';
import { UserModel } from '../model/User.model';

export const crearUsuario = async (req: Request, res: Response) => {

  const { email, names, lastnames, password } = req.body;

  try {
    const user = await UserModel.create({ email, names, lastnames, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creando usuario' });
  }
}