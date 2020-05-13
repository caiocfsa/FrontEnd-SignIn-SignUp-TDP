// Responsavel pela criaçao deste agendamento
// Regra de negocio

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentRespository from '../repositories/AppointmentRepository';

//tipagem de requisição
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({date, provider_id}: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentRespository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    //Se ele encontrar agendamento com mesmo horario
    //dar error 400 e retornar mensagem que já existe neste horario
    if(findAppointmentInSameDate){
      throw new AppError('This Appointment is Alredy Booked');
    }


   const appointment = appointmentsRepository.create({
     provider_id,
     date: appointmentDate,
   });


   //Salvando no banco de dados
   await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
