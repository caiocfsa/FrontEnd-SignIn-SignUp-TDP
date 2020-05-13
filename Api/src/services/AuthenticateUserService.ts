import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User
  token: string;
}

class AuthenticateUserService {
  public async execute({email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // verificando se existe usuario com este email
    const user = await usersRepository.findOne({where: { email }});

    if(!user){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //user.passowrd = senha criptografada
    //password = senha não criptografada


    //retornara true ou false ( caso senha correta )
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //se passou usuario autenticado

    const token = sign({  }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
