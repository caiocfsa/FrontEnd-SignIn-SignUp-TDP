import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1587642729489 implements MigrationInterface {

   //Colocar o que quer que seja executado no banco Quando a Migration for executado
   public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.dropTable('users');
  }
}
