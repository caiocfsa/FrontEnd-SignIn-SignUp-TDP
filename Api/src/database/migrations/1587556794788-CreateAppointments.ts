import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1587556794788 implements MigrationInterface {


    //Colocar o que quer que seja executado no banco Quando a Migration for executado
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ]
        })
      );
    }


    //Utilizado para desfazer o que fazemos no metodo UP
    public async down(queryRunner: QueryRunner): Promise<void> {
      //deletar tabela
      await queryRunner.dropTable('appointments');
    }

}
