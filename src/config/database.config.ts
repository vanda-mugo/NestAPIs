import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '13881388Vanda',
  name: process.env.DATABASE_NAME || 'nestjs',
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // set to false in production
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true',
}));

// You can access these configuration variables in your application using the ConfigService
// For example, to get the database host, you can use:
// const dbHost = this.configService.get('database.host');
