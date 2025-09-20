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

  users: {
    firstname: string;
    lastname: string;
    age: number;
    isMarried: boolean;
    password: string;
    email: string;
    gender?: string;
  }[] = [
    {
      firstname: 'Alice',
      lastname: 'Smith',
      age: 30,
      isMarried: true,
      password: 'alice123',
      email: 'alice@example.com',
      gender: 'female',
    },
    {
      firstname: 'Bob',
      lastname: 'Johnson',
      age: 25,
      isMarried: false,
      password: 'bob123',
      email: 'bob@example.com',
    },
    {
      firstname: 'Charlie',
      lastname: 'Brown',
      age: 35,
      isMarried: true,
      password: 'charlie123',
      email: 'charlie@example.com',
    },
    {
      firstname: 'David',
      lastname: 'Williams',
      age: 28,
      isMarried: false,
      password: 'david123',
      email: 'david@example.com',
    },
    {
      firstname: 'Eve',
      lastname: 'Johnson',
      age: 22,
      isMarried: false,
      password: 'eve123',
      email: 'eve@example.com',
    },
    {
      firstname: 'Frank',
      lastname: 'Miller',
      age: 40,
      isMarried: true,
      password: 'frank123',
      email: 'frank@example.com',
    },
    {
      firstname: 'Grace',
      lastname: 'Hopper',
      age: 27,
      isMarried: false,
      password: 'grace123',
      email: 'grace@example.com',
    },
    {
      firstname: 'Hannah',
      lastname: 'Williams',
      age: 32,
      isMarried: true,
      password: 'hannah123',
      email: 'hannah@example.com',
    },
    {
      firstname: 'Ivy',
      lastname: 'Johnson',
      age: 29,
      isMarried: false,
      password: 'ivy123',
      email: 'ivy@example.com',
    },
    {
      firstname: 'Jack',
      lastname: 'Daniels',
      age: 31,
      isMarried: true,
      password: 'jack123',
      email: 'jack@example.com',
    },
  ];

  getAllUsers() {
    console.log('Getting all users');
    if (this.authService.isAuthenticated === false) {
      return `You are not authorized to access this resource. Please login first.`;
    }
    return this.users;
  }

  getUserByEmail(email: string) {
    console.log(email);
    return this.users.find((user) => user.email === email);
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

  getUsersByMaritalStatus(isMarried?: boolean) {
    if (isMarried === undefined) {
      return this.users;
    }
    return this.users.filter((user) => user.isMarried === isMarried);
  }

  // getUsersByAge(age: number) {
  //   return this.users.filter((user) => user.age === age);
  // }

  updateUser(user: {
    firstname?: string;
    lastname?: string;
    age?: number;
    isMarried?: boolean;
    password?: string;
    email?: string;
  }) {
    const existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      // Update only the provided fields
      if (user.firstname !== undefined) {
        existingUser.firstname = user.firstname;
      }
      if (user.lastname !== undefined) {
        existingUser.lastname = user.lastname;
      }
      if (user.age !== undefined) {
        existingUser.age = user.age;
      }
      if (user.isMarried !== undefined) {
        existingUser.isMarried = user.isMarried;
      }
      return `User updated successfully: ${JSON.stringify(existingUser)}`;
    } else {
      return `User with Email ${user.email} not found.`;
    }
  }
}

/**
 * Potential causes:
- A circular dependency between modules. Use forwardRef() to avoid it. Read more: https://docs.nestjs.com/fundamentals/circular-dependency
- The module at index [0] is of type "undefined". Check your import statements and the type of the module.
 */
