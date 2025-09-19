import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService], // this is to enable dependency injection in the tweets controller
  imports: [UsersModule], // import UsersModule to use UsersService
  // note by you can only export a provider as you cannot export a controller
  // you can only import a module to use its exported providers
})
export class TweetsModule {}
