import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import usureAthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();


//Utilizando Middlware de Auth Para usar Rotas
appointmentsRouter.use(usureAthenticated);

//Listando Agendamentos
appointmentsRouter.get('/', async (request, response)=> {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  //Buscando agendamento do Repositorio ( Funcao All())
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

//Criar Agendamentos
appointmentsRouter.post('/', async (request, response) => {
    //Dados recebidos da request para realizar cadastro de agendamento
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService();

  const appointment = await CreateAppointment.execute({ date: parsedDate, provider_id })


  return response.json(appointment);
})

export default appointmentsRouter;
