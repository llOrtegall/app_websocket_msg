import { validateUseer } from '../schemas/User.schema';
import { hashSync, compareSync } from 'bcryptjs';
import { UserModel } from '../model/User.model';
import { JWT_SECRET, SALT } from '../config';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUseer(req.body);

    if (!result) {
      res.status(400).json({ message: 'Datos incorrectos' });
      return;
    }

    const passHash = hashSync(result.password, SALT);
    await UserModel.sync();
    await UserModel.create({ email: result.email, password: passHash, names: result.names, lastnames: result.lastnames });
    res.status(201).json('Usuario creado correctamente');
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creando usuario' });
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      attributes: ['id', 'email', 'names', 'lastnames', 'password'], 
      where: { email: email } 
    });

    if (!user) {
      res.status(400).json({ message: 'Usuario no encontrado' });
      return;
    }

    const passMatch = compareSync(password, user.dataValues.password);

    if (!passMatch) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }
    
    const { id, names, lastnames } = user.dataValues;

    sign({ id, names, lastnames, email }, JWT_SECRET, { expiresIn: '1h'}, (err: any, token?: string) => {
      if (err) throw err;
      if (token) {
        res.cookie('token', token, { sameSite: 'lax', secure: true }).status(201).json({ id, names, lastnames, email });
      } else {
        res.status(500).json('Token generation failed');
      }
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error obteniendo usuario' });
  }
}