//import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    console.log('Getting all users');
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    console.log(email);
    return await this.userRepository.findOne({ where: { email } });
  }

  public async createUser(user: CreateUserDto) {
    // validate if user with the same email already exists , this is in lue to the entity definition
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    // if user exists, throw an error
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    // if user does not exist, create a new user , this is just an object
    // note by you can perform additional operations here like hashing the password before saving to the database
    // create a new user instance
    const newUser = this.userRepository.create(user);
    // save the new user to the database
    await this.userRepository.save(newUser);
    return newUser;
  }

  /*
  async getUsersByMaritalStatus(isMarried?: boolean) {
    if (isMarried === undefined) {
      return await this.userRepository.find();
    }
    return await this.userRepository.find({
      where: { isMarried },
    });
  }
  */

  // getUsersByAge(age: number) {
  //   return this.users.filter((user) => user.age === age);
  // }

  async updateUser(user: {
    firstname?: string;
    lastname?: string;
    age?: number;
    isMarried?: boolean;
    password?: string;
    email?: string;
  }) {
    // find user by email
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      // Update only the provided fields
      Object.assign(existingUser, user);
    } else {
      return `User with Email ${user.email} not found.`;
    }

    // save the updated user to the database
    await this.userRepository.save(existingUser);
    return `User with Email ${user.email} updated successfully: ${JSON.stringify(existingUser)}`;
  }
}

/**
 * Potential causes:
- A circular dependency between modules. Use forwardRef() to avoid it. Read more: https://docs.nestjs.com/fundamentals/circular-dependency
- The module at index [0] is of type "undefined". Check your import statements and the type of the module.
 */
