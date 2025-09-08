import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';

@Module({
  controllers: [TweetsController],
  providers: [],
})
export class TweetsModule {}
