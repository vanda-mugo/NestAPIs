import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  isAuthenticated: boolean = false;
  // we shall use this property to check if the user is authenticated or not
  // we want to use this property in the users controller to restrict access to certain routes
  // for example, we want to restrict access to the route that gets all users
  // we can do this by checking if the user is authenticated or not
  // if the user is not authenticated, we can return a 401 Unauthorized error

  /*
  login(email: string, password: string): string {
    if (!this.usersService.users || !Array.isArray(this.usersService.users)) {
      return `Invalid credentials`;
    }

    const user = this.usersService.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      this.isAuthenticated = true;
      return `User ${user.email} logged in successfully`;
    }
    return `Invalid credentials, user does not exist`;
  }
    */
}
