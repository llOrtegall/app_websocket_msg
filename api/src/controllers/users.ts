import { UserModel } from '../model/User.model';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {

  const { email, names, lastnames, password } = req.body;

  try {
    const user = await UserModel.create({ email, names, lastnames, password });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error creando usuario' });
  }
}