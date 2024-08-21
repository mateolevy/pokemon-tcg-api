import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1724274351735 implements MigrationInterface {
  name = 'SchemaUpdate1724274351735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "text" character varying(255) NOT NULL, "damage" integer NOT NULL, "card_id" uuid NOT NULL, CONSTRAINT "UQ_aa95e5098dddd1f131af735cad1" UNIQUE ("card_id", "name"), CONSTRAINT "CHK_b02f434a73ab75e7c9e12eb440" CHECK ("damage" > 0), CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "weakness" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "multiplier" integer NOT NULL, "card_id" uuid NOT NULL, "type_id" uuid NOT NULL, CONSTRAINT "CHK_7be925dbdd54dda6afa5db0771" CHECK ("multiplier" > 1), CONSTRAINT "PK_b74bcbd950ee633364273ee55be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resistance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "card_id" uuid NOT NULL, "type_id" uuid NOT NULL, CONSTRAINT "CHK_dad60341bf91fd777025b08064" CHECK ("value" < 0), CONSTRAINT "PK_8b91aa1a4b047294b638b3c9f3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_91bf32b323734a2ffa3616a5c33" UNIQUE ("name"), CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "hp" integer NOT NULL, "image_url" character varying(2048), "type_id" uuid NOT NULL, "rarity_id" uuid NOT NULL, "set_id" uuid NOT NULL, CONSTRAINT "CHK_087e88a68136214aebb0ab94b8" CHECK ("hp" > 0), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d311dc7af4f9587fe6076d11c5" ON "card" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_91aaf3605b4bd3307de64c32a43" UNIQUE ("name"), CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_32591016655126aad6df88034a6" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" ADD CONSTRAINT "FK_624ce3d3e8097ec03d460848784" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" ADD CONSTRAINT "FK_0abdefa11907f6b499e78275d44" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_4b9394efa5bf6a1e98b254b3e6a" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_03ec518a7d79f1691b320d7c277" FOREIGN KEY ("rarity_id") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_d0a1f698623cc95750422e1aeae" FOREIGN KEY ("set_id") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_d0a1f698623cc95750422e1aeae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_03ec518a7d79f1691b320d7c277"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_4b9394efa5bf6a1e98b254b3e6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_0abdefa11907f6b499e78275d44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resistance" DROP CONSTRAINT "FK_8f2fe851db18ddfd5390fd2f237"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_624ce3d3e8097ec03d460848784"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weakness" DROP CONSTRAINT "FK_32591016655126aad6df88034a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_a2980243f2d6e2c0c23fa097d15"`,
    );
    await queryRunner.query(`DROP TABLE "set"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d311dc7af4f9587fe6076d11c5"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "rarity"`);
    await queryRunner.query(`DROP TABLE "resistance"`);
    await queryRunner.query(`DROP TABLE "weakness"`);
    await queryRunner.query(`DROP TABLE "type"`);
    await queryRunner.query(`DROP TABLE "attack"`);
  }
}
