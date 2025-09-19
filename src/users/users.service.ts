//import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: {
    id: number;
    name: string;
    age: number;
    isMarried: boolean;
    password: string;
    email?: string;
  }[] = [
    {
      id: 1,
      name: 'Alice',
      age: 30,
      isMarried: true,
      password: 'alice123',
      email: 'alice@example.com',
    },
    {
      id: 2,
      name: 'Bob',
      age: 25,
      isMarried: false,
      password: 'bob123',
      email: 'bob@example.com',
    },
    {
      id: 3,
      name: 'Charlie',
      age: 35,
      isMarried: true,
      password: 'charlie123',
      email: 'charlie@example.com',
    },
    {
      id: 4,
      name: 'David',
      age: 28,
      isMarried: false,
      password: 'david123',
      email: 'david@example.com',
    },
    {
      id: 5,
      name: 'Eve',
      age: 22,
      isMarried: false,
      password: 'eve123',
      email: 'eve@example.com',
    },
    {
      id: 6,
      name: 'Frank',
      age: 40,
      isMarried: true,
      password: 'frank123',
      email: 'frank@example.com',
    },
    {
      id: 7,
      name: 'Grace',
      age: 27,
      isMarried: false,
      password: 'grace123',
      email: 'grace@example.com',
    },
    {
      id: 8,
      name: 'Hannah',
      age: 32,
      isMarried: true,
      password: 'hannah123',
      email: 'hannah@example.com',
    },
    {
      id: 9,
      name: 'Ivy',
      age: 29,
      isMarried: false,
      password: 'ivy123',
      email: 'ivy@example.com',
    },
    { id: 10, name: 'Jack', age: 31, isMarried: true, password: 'jack123' },
  ];

  getAllUsers() {
    console.log('Getting all users');
    if (this.authService.isAuthenticated === false) {
      return `You are not authorized to access this resource. Please login first.`;
    }
    return this.users;
  }

  getUserById(id: number) {
    console.log(id);
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    isMarried: boolean;
    password: string;
    email?: string;
  }) {
    this.users.push(user);
    return `User created successfully: ${JSON.stringify(user)}`;
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
    id: number;
    name?: string;
    age?: number;
    isMarried?: boolean;
    password?: string;
    email?: string;
  }) {
    const existingUser = this.users.find((u) => u.id === user.id);
    if (existingUser) {
      // Update only the provided fields
      if (user.name !== undefined) {
        existingUser.name = user.name;
      }
      if (user.age !== undefined) {
        existingUser.age = user.age;
      }
      if (user.isMarried !== undefined) {
        existingUser.isMarried = user.isMarried;
      }
      return `User updated successfully: ${JSON.stringify(existingUser)}`;
    } else {
      return `User with ID ${user.id} not found.`;
    }
  }
}

/**
 * Potential causes:
- A circular dependency between modules. Use forwardRef() to avoid it. Read more: https://docs.nestjs.com/fundamentals/circular-dependency
- The module at index [0] is of type "undefined". Check your import statements and the type of the module.
 */
