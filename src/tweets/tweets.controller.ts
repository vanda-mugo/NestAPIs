import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  //tweets or /tweets/:userId
  @Get(':userId')
  // public is optional in TypeScript
  public getTweets(@Param('userId', ParseIntPipe) userId?: number) {
    // this route should handle any request that comes to /tweets or /tweets/:userId
    //lets say we want to display the user from the usermodule
    // we have to export the UsersService from the usermodule
    // and then import it here in the tweets module
    // and then inject it in the constructor of the tweets controller
    // and then use it in the getTweets method
    // for now, we will just use the TweetsService to get all tweets
    // note by you can only export a provider as you cannot export a controller
    if (userId) {
      return this.tweetsService.getTweetsByUserId(userId);
    }
    return this.tweetsService.getAllTweets();
  }
}
