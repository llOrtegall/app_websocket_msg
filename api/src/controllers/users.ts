import { validateUseer } from '../schemas/User.schema';
import { UserModel } from '../model/User.model';
import { Request, Response } from 'express';
import { hashSync } from 'bcryptjs';

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const result = await validateUseer(req.body);

    if (!result) {
      res.status(400).json({ message: 'Datos incorrectos' });
      return;
    }

    const passHash = hashSync(result.password, 10);
    await UserModel.sync();
    await UserModel.create({ email: result.email, password: passHash, names: result.names, lastnames: result.lastnames });
    res.status(201).json('Usuario creado correctamente');
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creando usuario' });
  }
}