import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateOrder1587047061624 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'order',
      columns: [
        {
          name: 'order_id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'origin',
          type: 'text'
        },
        {
          name: 'destination',
          type: 'text'
        },
        {
          name: 'distance',
          type: 'int'
        },
        {
          name: 'status',
          type: 'varchar(20)'
        },
        {
          name: 'version',
          type: 'int'
        }
      ]
    }), true)

    await queryRunner.createIndex('order', new TableIndex({
      name: 'ID_ORDER_ID',
      columnNames: ['order_id']
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
  }
}
