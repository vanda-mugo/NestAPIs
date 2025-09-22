import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // export UsersService to be used in other modules
  imports: [
    forwardRef(() => AuthModule), // this is expected with circular dependencies
    TypeOrmModule.forFeature([User, Profile]), // import TypeOrmModule and register User entity
  ],
})
export class UsersModule {}
