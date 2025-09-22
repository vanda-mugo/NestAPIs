import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '13881388Vanda',
        database: 'nestjs',
        autoLoadEntities: true, // this will automatically load entities that are registered through the forFeature() method
        // alternatively you can specify the entities here
        //entities: [User, Profile], // add your entities here to make typeorm aware of them
        synchronize: true, // recommend to be false in production
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
