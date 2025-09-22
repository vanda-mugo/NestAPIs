import 'reflect-metadata';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First name must be a string' })
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(100, { message: 'First name must be at most 100 characters long' })
  firstname?: string;

  @IsString({ message: 'Last name must be a string' })
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Last name must be at most 100 characters long' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastname?: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Age must be a number' })
  age?: number;

  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  @MaxLength(10, { message: 'Gender must be at most 10 characters long' })
  gender?: string;

  @IsOptional()
  isMarried?: boolean;

  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  @MaxLength(500, { message: 'Bio must be at most 500 characters long' })
  bio?: string;

  @IsOptional()
  @IsString({ message: 'Profile image URL must be a string' })
  @MaxLength(255, {
    message: 'Profile image URL must be at most 255 characters long',
  })
  profileImageUrl?: string;

  @IsOptional()
  dateOfBirth?: Date;
}
