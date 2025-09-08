//import { Injectable } from '@nestjs/common';

export class UsersService {
  users: { id: number; name: string; age: number; isMarried: boolean }[] = [
    { id: 1, name: 'Alice', age: 30, isMarried: true },
    { id: 2, name: 'Bob', age: 25, isMarried: false },
    { id: 3, name: 'Charlie', age: 35, isMarried: true },
    { id: 4, name: 'David', age: 28, isMarried: false },
    { id: 5, name: 'Eve', age: 22, isMarried: false },
    { id: 6, name: 'Frank', age: 40, isMarried: true },
    { id: 7, name: 'Grace', age: 27, isMarried: false },
    { id: 8, name: 'Hannah', age: 32, isMarried: true },
    { id: 9, name: 'Ivy', age: 29, isMarried: false },
    { id: 10, name: 'Jack', age: 31, isMarried: true },
  ];

  getAllUsers() {
    console.log('Getting all users');
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
