import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  @Post()
  login(@Body() user: { email: string; password: string }): string {
    //return this.authService.login(user.email, user.password);
  }
    */
}
