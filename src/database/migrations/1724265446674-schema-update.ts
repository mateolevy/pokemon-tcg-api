import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1724265446674 implements MigrationInterface {
  name = 'SchemaUpdate1724265446674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attack" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "text" character varying NOT NULL, "damage" integer NOT NULL, "cardId" integer NOT NULL, CONSTRAINT "UQ_a9f3e37ce252a8d63dd44ec98a6" UNIQUE ("cardId", "name"), CONSTRAINT "CHK_b02f434a73ab75e7c9e12eb440" CHECK ("damage" > 0), CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resistance" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "cardId" integer NOT NULL, "typeId" integer NOT NULL, CONSTRAINT "CHK_dad60341bf91fd777025b08064" CHECK ("value" < 0), CONSTRAINT "PK_8b91aa1a4b047294b638b3c9f3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_91bf32b323734a2ffa3616a5c33" UNIQUE ("name"), CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "set" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_91aaf3605b4bd3307de64c32a43" UNIQUE ("name"), CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "hp" integer NOT NULL, "image_url" character varying(2048), "typeId" integer NOT NULL, "rarityId" integer NOT NULL, "setId" integer, CONSTRAINT "CHK_087e88a68136214aebb0ab94b8" CHECK ("hp" > 0), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d311dc7af4f9587fe6076d11c5" ON "card" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "weakness" ("id" SERIAL NOT NULL, "multiplier" integer NOT NULL, "cardId" integer NOT NULL, "typeId" integer NOT NULL, CONSTRAINT "CHK_7be925dbdd54dda6afa5db0771" CHECK ("multiplier" > 1), CONSTRAINT "PK_b74bcbd950ee633364273ee55be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_2a64f46834c2804d05ae4eae502" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_7e04d2b8edc47fefaf0abc63bba" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_2b409abd671d73377de26861381" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_89f4ce8ff7f2618884e7b75c026" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_d4b37c8ab5313891f965f526488" FOREIGN KEY ("rarityId") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_5c54def213ff8487c2bf6a06d40" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_e737b7b889688ee798e5bd6c9ad" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_81ce5b04db29ee41bfba363b2b0" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_81ce5b04db29ee41bfba363b2b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_e737b7b889688ee798e5bd6c9ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_5c54def213ff8487c2bf6a06d40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_d4b37c8ab5313891f965f526488"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_89f4ce8ff7f2618884e7b75c026"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_2b409abd671d73377de26861381"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_7e04d2b8edc47fefaf0abc63bba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_2a64f46834c2804d05ae4eae502"`,
    );
    await queryRunner.query(`DROP TABLE "weakness"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d311dc7af4f9587fe6076d11c5"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "set"`);
    await queryRunner.query(`DROP TABLE "rarity"`);
    await queryRunner.query(`DROP TABLE "resistance"`);
    await queryRunner.query(`DROP TABLE "type"`);
    await queryRunner.query(`DROP TABLE "attack"`);
  }
}
