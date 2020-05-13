import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

//instancia do multer com metodos
const upload = multer(uploadConfig);

//Criar Usuarios
usersRouter.post('/', async (request, response) => {

    //pegando dados do usuario
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    })


    //para nao retornar informação
    delete user.password;


    return response.json(user);

})


//atualizar informação do usuario ( avatar )
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
 async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const  user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete  user.password;

    return response.json(user);
});

export default usersRouter;
