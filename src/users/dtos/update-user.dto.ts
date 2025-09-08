import { PartialType } from '@nestjs/mapped-types';
// note by mapped tuypes we can create a new dto by making all the properties of an existing dto optional
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // now all the properties of CreateUserDto are optional in UpdateUserDto
}
// you can also add new properties to the UpdateUserDto if you want
// for example, you can add a new property called isActive
// @IsBoolean()
// @IsOptional()
// isActive?: boolean;

// you can also use other mapped types like OmitType, PickType etc
// for more information, check the official documentation of NestJS
// https://docs.nestjs.com/openapi/mapped-types
