import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/app.config';

const ENV = process.env.NODE_ENV;
console.log('Current Environment:', ENV);
if (ENV === 'development') {
  console.log('Using development environment variables');
} else if (ENV === 'test') {
  console.log('Using test environment variables');
} else {
  console.log('Using production environment variables');
}

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // this will make the ConfigModule available globally
      envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        // alternatively you can specify the entities here
        //entities: [User, Profile], // add your entities here to make typeorm aware of them
        synchronize: configService.get('database.synchronize'),
        inject: [],
      }),
    }),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// you can get the documentation of TypeORM module here
// https://docs.nestjs.com/techniques/database
// https://typeorm.io/#/installation
// https://typeorm.io/#/connection-options
// https://typeorm.io/#/entities
// this are the settings necessary to connect to a PostgreSQL database
