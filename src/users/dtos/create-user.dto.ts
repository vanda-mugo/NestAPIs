// so note the impotance of DTOs
// in ensuring that the data being sent to the server is of the correct type
// and also in ensuring that the data being sent to the server is valid
// for example, if we want to create a user, we can use a DTO to ensure that the
// data being sent to the server is valid
// and also to ensure that the data being sent to the server is of the correct type

import 'reflect-metadata';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  MaxLength,
  IsEmail,
} from 'class-validator';
// validating a dto with class-validator and class-transformer
// you can also use other validation libraries like joi, yup, zod etc
// but class-validator and class-transformer are the most popular ones in the NestJS community

// to use class-validator and class-transformer, you need to install them first
// npm install class-validator class-transformer
// we need to use the class-validator with the class-transformer to transform the plain object to a class instance
// and then validate the class instance
// we will see how to do that in the controller section
export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(25, { message: 'Username must be at most 25 characters long' })
  username: string;

  @IsBoolean({ message: 'isMarried must be a boolean' })
  isMarried: boolean;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(50, { message: 'Email must be at most 50 characters long' })
  email: string;
}

//you can see the list of available validators when you type @Is in your IDE
// you can also create your own custom validators
// for more information, check the official documentation of class-validator
// https://github.com/typestack/class-validator
// note by there is no unique validator in class-validator
// you can enforce the unique constraint at the database level
// by adding a unique constraint to the email column in the user entity
// see the user.entity.ts file for more details
