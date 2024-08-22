import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1724292122671 implements MigrationInterface {
  name = 'SchemaUpdate1724292122671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_32591016655126aad6df88034a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_32591016655126aad6df88034a6" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_32591016655126aad6df88034a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_32591016655126aad6df88034a6" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
