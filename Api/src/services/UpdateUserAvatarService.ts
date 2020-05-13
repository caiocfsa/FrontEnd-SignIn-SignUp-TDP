import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';
interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFileName }: Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Only Authenticated users can change avatar', 401);
    }

    if(user.avatar){
      //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);


      //Verifica se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // update do avatar

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
