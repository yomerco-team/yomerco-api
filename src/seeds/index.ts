import * as path from 'path';
import * as dotenv from 'dotenv';

import { Logger } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

import { ParameterFactory } from './parameters.seed';

const NODE_ENV = process.env.NODE_ENV || 'local';
const envPath = path.resolve(__dirname, `../../.env.${NODE_ENV}`);

dotenv.config({ path: envPath });

const opt = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: false,
  entities: [
    ParameterFactory.entity
    
  ]
};

(async () => {
  const connection = await createConnection(opt as ConnectionOptions);

  Logger.debug('--- PARAMETERS START ---');

  await ParameterFactory.handle(connection);

  Logger.debug('--- PARAMETERS END ---');

  connection.close();
})()
  .catch(err => console.error(err))
  .finally(() => process.exit(0));