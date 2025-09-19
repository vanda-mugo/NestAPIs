import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule)], // import UsersModule to use UsersService
  // note by you can only export a provider as you cannot export a controller
  // you can only import a module to use its exported providers
  exports: [AuthService], // export AuthService to be used in other modules
})
export class AuthModule {}
