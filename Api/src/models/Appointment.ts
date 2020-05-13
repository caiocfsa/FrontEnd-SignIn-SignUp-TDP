
//entidade que vai ser salva no banco de dados
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';
//Decoreted | Indicando que model sera salvo na tabela
@Entity('appointments')
//Tipagem do Appointment
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  //Muitos agendamentos para um usuario
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
