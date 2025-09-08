import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService],
  imports: [UsersModule], // import UsersModule to use UsersService
})
export class TweetsModule {}
