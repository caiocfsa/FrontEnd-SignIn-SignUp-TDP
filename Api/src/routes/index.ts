import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();


//Com isso no Arquivo appointment.routes.ts nao é necessario passar mais o caminho
// pois o mesmo já sera definido por aqui, apontando para os metodos dentro do appointments
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
