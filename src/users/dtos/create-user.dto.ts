// so note the impotance of DTOs
// in ensuring that the data being sent to the server is of the correct type
// and also in ensuring that the data being sent to the server is valid
// for example, if we want to create a user, we can use a DTO to ensure that the
// data being sent to the server is valid
// and also to ensure that the data being sent to the server is of the correct type

import 'reflect-metadata';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
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
  @IsNumber({}, { message: 'ID must be a number' })
  @IsNotEmpty({ message: 'ID is required' })
  id: number;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @IsBoolean({ message: 'isMarried must be a boolean' })
  isMarried: boolean;
}

//you can see the list of available validators when you type @Is in your IDE
// you can also create your own custom validators
// for more information, check the official documentation of class-validator
// https://github.com/typestack/class-validator
