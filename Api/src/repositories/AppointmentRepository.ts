
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

//Private e Public ( Esclusividade do Typescript)


@EntityRepository(Appointment)
//                                   Parametro de uma tipagem
class AppointmentRespository extends Repository<Appointment> {


  //Assync Await retorna uma Promise contendo nosso retorno esperado
  public async findByDate(date: Date): Promise<Appointment | null> {

    //encontrar agendamento na mesma data
    const findAppointment = await this.findOne({
      where: { date }
    });

    return findAppointment || null;

    };
  };


export default AppointmentRespository;
