import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '../common/env/env.local' });
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'local' ? 'localhost' : process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrations: [__dirname + './../migrations/**/*{.ts,.js}'],
};

export const dataSourcetteye: DataSource = new DataSource(dataSourceOptions);
