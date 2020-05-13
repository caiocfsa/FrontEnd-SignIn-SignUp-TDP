
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  // se o erro foi da minha aplicação retornar qual o erro
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
});

app.listen(3333, () => {
  console.log(' Servidor Iniciado na Porta 3333');
});
