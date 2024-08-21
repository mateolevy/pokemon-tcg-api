import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  migrationsRun: false,
  logging: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource: DataSource = new DataSource(config);
