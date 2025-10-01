export const appConfig = () => {
  return {
    environment: process.env.NODE_ENV || 'production',

    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      name: process.env.DATABASE_NAME || 'nest-js-intro',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true',
    },
  };
};
