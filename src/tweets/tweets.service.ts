import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  constructor(private readonly usersService: UsersService) {}

  tweets: { text: string; userEmail: string; date: Date }[] = [
    { text: 'Hello World', userEmail: 'alice@example.com', date: new Date() },
    {
      text: 'NestJS is great!',
      userEmail: 'bob@example.com',
      date: new Date(),
    },
    {
      text: 'TypeScript rocks!',
      userEmail: 'alice@example.com',
      date: new Date(),
    },
    {
      text: 'I love programming!',
      userEmail: 'charlie@example.com',
      date: new Date(),
    },
    {
      text: 'Dependency Injection is powerful!',
      userEmail: 'alice@example.com',
      date: new Date(),
    },
    {
      text: 'Modules are awesome!',
      userEmail: 'bob@example.com',
      date: new Date(),
    },
    {
      text: 'Controllers handle requests!',
      userEmail: 'charlie@example.com',
      date: new Date(),
    },
  ];

  getAllTweets() {
    return this.tweets;
  }

  /*
  getTweetsByUserEmail(email: string) {
    const user = this.usersService.getUserByEmail(email);
    if (!user) {
      return `User with email ${email} not found`;
    }
    const tweets = this.tweets.filter(
      (tweet) => tweet.userEmail === user.email,
    );

    // map iterator array method to return only text and date of the tweet along with the name of the user
    const response = tweets.map((tweet) => {
      return {
        text: tweet.text,
        date: tweet.date,
        name: user.firstname + ' ' + user.lastname,
      };
    });
    return response;
  }
  */
}

/**
 * number (lowercase) is the TypeScript primitive type for numeric values (e.g., let x: number = 5;).
 * Number (uppercase) is the JavaScript built-in object wrapper for numbers (e.g., let y: Number = new Number(5);).
 * Best practice:
 * Always use number for type annotations in TypeScript.
 * Use Number only when you specifically need the object wrapper (rare in typical code).
 *
 * Summary:
 *
 * Use number for variables, parameters, and DTOs in TypeScript.
 * Avoid using Number unless you need object methods or properties.
 */
