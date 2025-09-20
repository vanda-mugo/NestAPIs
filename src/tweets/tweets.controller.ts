import { Controller, Get, Param } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get() // this route should handle any request that comes to /
  public getAllTweets() {
    return this.tweetsService.getAllTweets();
  }

  //tweets or /tweets/:userId
  // http://localhost:3000/tweets
  // http://localhost:3000/tweets/1
  // we can make the userId parameter optional by using the ? operator
  // but we cannot do that in the route definition
  // so we have to define two routes
  // one for /tweets and one for /tweets/:userId
  // but we can handle both routes in the same method
  // by checking if the userId parameter is present or not

  // NOTE BY YOU CANNOT HAVE AN OPTIONAL PARAMETER IN THE ROUTE DEFINITION
  // YOU HAVE TO DEFINE TWO ROUTES
  // ONE FOR /tweets AND ONE FOR /tweets/:userId
  // BUT YOU CAN HANDLE BOTH ROUTES IN THE SAME METHOD
  // BY CHECKING IF THE userEmail PARAMETER IS PRESENT OR NOT
  @Get(':userEmail')
  // public is optional in TypeScript
  //In your current setup, marking userEmail as optional is not necessary, because the route always expects it.
  public getTweets(@Param('userEmail') userEmail: string) {
    // this route should handle any request that comes to /tweets or /tweets/:userEmail
    //lets say we want to display the user from the usermodule
    // we have to export the UsersService from the usermodule
    // and then import it here in the tweets module
    // and then inject it in the constructor of the tweets controller
    // and then use it in the getTweets method
    // for now, we will just use the TweetsService to get all tweets
    // note by you can only export a provider as you cannot export a controller
    if (userEmail) {
      //return this.tweetsService.getTweetsByUserEmail(userEmail);
    }
  }
}
