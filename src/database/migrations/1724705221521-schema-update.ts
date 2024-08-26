import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1724273777847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "set" ("name") VALUES
      ('Scarlet & Violet Series'),
      ('Sword & Shield Series'),
      ('Sun & Moon Series'),
      ('XY Series'),
      ('Black & White Series'),
      ('HeartGold SoulSilver Series'),
      ('Platinum Series'),
      ('Diamond & Pearl Series'),
      ('EX Ruby & Sapphire Series'),
      ('e-Card Series'),
      ('Gym Heroes Series'),
      ('Neo Genesis Series'),
      ('Legendary Collection Series'),
      ('Base Set Series'),
      ('Call of Legends Series'),
      ('Nintendo Promos Series')
      ON CONFLICT DO NOTHING;
    `);

    // Seed Rarity data
    await queryRunner.query(`
      INSERT INTO "rarity" ("name") VALUES
      ('Common'),
      ('Uncommon'),
      ('Rare')
      ON CONFLICT DO NOTHING;
    `);

    // Seed Pokémon Types data
    await queryRunner.query(`
      INSERT INTO "type" ("name") VALUES
      ('Normal'),
      ('Fire'),
      ('Water'),
      ('Grass'),
      ('Electric'),
      ('Ice'),
      ('Fighting'),
      ('Poison'),
      ('Ground'),
      ('Flying'),
      ('Psychic'),
      ('Bug'),
      ('Rock'),
      ('Ghost'),
      ('Dragon'),
      ('Dark'),
      ('Steel'),
      ('Fairy')
      ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optionally remove seeded data
    await queryRunner.query(`
      DELETE FROM "set" WHERE "name" IN (
        'Scarlet & Violet Series',
        'Sword & Shield Series',
        'Sun & Moon Series',
        'XY Series',
        'Black & White Series',
        'HeartGold SoulSilver Series',
        'Platinum Series',
        'Diamond & Pearl Series',
        'EX Ruby & Sapphire Series',
        'e-Card Series',
        'Gym Heroes Series',
        'Neo Genesis Series',
        'Legendary Collection Series',
        'Base Set Series',
        'Call of Legends Series',
        'Nintendo Promos Series'
      );
    `);

    await queryRunner.query(`
      DELETE FROM "rarity" WHERE "name" IN ('Common', 'Uncommon', 'Rare');
    `);

    await queryRunner.query(`
      DELETE FROM "type" WHERE "name" IN (
        'Normal',
        'Fire',
        'Water',
        'Grass',
        'Electric',
        'Ice',
        'Fighting',
        'Poison',
        'Ground',
        'Flying',
        'Psychic',
        'Bug',
        'Rock',
        'Ghost',
        'Dragon',
        'Dark',
        'Steel',
        'Fairy'
      );
    `);
  }
}
