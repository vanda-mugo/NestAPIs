import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  constructor(private readonly usersService: UsersService) {}
  tweets: { text: string; userId: number; date: Date }[] = [
    { text: 'Hello World', userId: 1, date: new Date() },
    { text: 'NestJS is great!', userId: 2, date: new Date() },
    { text: 'TypeScript rocks!', userId: 1, date: new Date() },
    { text: 'I love programming!', userId: 3, date: new Date() },
  ];

  getAllTweets() {
    return this.tweets;
  }

  getTweetsByUserId(userId: number) {
    const user = this.usersService.getUserById(userId);
    if (!user) {
      return `User with id ${userId} not found`;
    }
    const tweets = this.tweets.filter((tweet) => tweet.userId === userId);

    const response = tweets.map((tweet) => {
      return { text: tweet.text, date: tweet.date, name: user.name };
    });
    return response;
  }
}
