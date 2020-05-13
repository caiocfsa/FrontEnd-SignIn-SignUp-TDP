// path utilizado para caminhos
import path from 'path';
//Multer utilizado para upload de arquivos no express
import multer from 'multer';
//crypto utilizado para gerar hash/criar criptografia
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      //ficando hash na frente do arquivo seguido do nome do arquivo
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),
};
