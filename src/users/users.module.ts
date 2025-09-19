import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // export UsersService to be used in other modules
  imports: [forwardRef(() => AuthModule)], // this is expected with circular dependencies
})
export class UsersModule {}
