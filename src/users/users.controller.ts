import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Query,
  DefaultValuePipe,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  // to define the constructor of the class
  // and to inject the UsersService into the controller
  // we can use the constructor to create an instance of the UsersService
  // and then use it in the methods of the controller
  // this is called dependency injection
  // and it is a design pattern that allows us to create loosely coupled code
  // which is easier to test and maintain
  // we can also use the @Injectable() decorator to make the UsersService injectable
  // and then we can use it in other controllers as well
  // for now, we will just use it in this controller
  // so we will create a private property called usersService
  // and then we will assign it to the instance of the UsersService
  // that we create in the constructor
  // this way, we can use the usersService property in all the methods of the controller
  constructor(private usersService: UsersService) {}

  // we are going to create a GET endpoint to get all users
  /**@Get(':isMarried')
  getUsersByMaritalStatus(
    @Param('isMarried', ParseBoolPipe) isMarried?: boolean,
  ) {
    const usersService = new UsersService();
    console.log(isMarried);
    return usersService.getUsersByMaritalStatus(isMarried);
  }*/
  // you can also read all query parameters as an object
  // you can also specify individual query parameters by using @Query('paramName') paramName: type
  // For example:
  // getUsers(@Query('age') age: number) {
  //   const usersService = new UsersService();
  //   return usersService.getUsersByAge(age);
  // }()
  @Get() // GET /users - get all users with optional query parameters
  getUsers(
    // we are using the DefaultValuePipe to set a default value for limit and page
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('gender') gender?: string,
    // ensure that even with conditonal query parameters, the order of parameters remains the same
    // also ensure to use the DefaultValuePipe before the ParseIntPipe so that in
    // the case that the values have not been provided in request
    @Query('age', new DefaultValuePipe(0), ParseIntPipe) age?: number,
  ) {
    console.log(gender, age);
    console.log(limit, page);
    return this.usersService.getAllUsers();
  }

  // lets say we want to use pipes to manage pagination of users

  /**
   * 
   * @param id If you define your route as /users/:id/:name/:gender, NestJS expects all three parameters to be present in the URL. If you call the endpoint without the gender part (e.g., /users/1/John), it will not match the route, so your controller method will not be called and you won't get a reply.

To support both URLs—with and without gender—you need to define two separate routes in your controller:
   * @returns 
   */

  @Get(':isMarried')
  getUsersByMaritalStatus(
    @Param() param?: GetUserParamDto, // we are reading the isMarried parameter from the url
  ) {
    //since we have injected the UsersService in the constructor, we can use it here
    //const usersService = new UsersService();
    console.log(param?.isMarried);
    return this.usersService.getUsersByMaritalStatus(param?.isMarried);
  }

  @Get(':id') // GET /users/:id - get user by id
  getUserById(
    @Param('id', ParseIntPipe) id: number, // you can also just read the value of one parameter
    //@Param('name') name: string,
    //@Param('gender') gender?: string,// the gender is optional
  ) {
    //const usersService = new UsersService();
    //console.log(id, name, gender);
    console.log(typeof id);
    console.log(id);
    return this.usersService.getUserById(id); // you can also just add a +id to convert string to number
  }

  // we are going to analyze the use of pipes in the next section
  // For now, just know that pipes are used for validation and transformation of data
  // Here, we are using the built-in ParseIntPipe to automatically convert the id parameter to a number
  // to use the custom dto, we need to create a new file in the dtos folder
  // and then import it here
  // and then use it in the createUser method
  // we also need to use the ValidationPipe to validate the dto
  // we will see how to do that in the next section

  // we are going to create a new user using the POST method
  // so we need to use the @Post() decorator
  // and then we need to use the @Body() decorator to read the body of the request
  // and then we need to use the CreateUserDto to validate the body of the request
  @Post()
  // since we are using the ValidationPipe globally in main.ts, we don't need to use it here
  createUser(@Body() user: CreateUserDto) {
    console.log(user);
    console.log(typeof user);
    console.log(user instanceof CreateUserDto); // this will return true
    // this is because we are using the transform option in the ValidationPipe
    // which will automatically transform the payloads to be objects typed according to their DTO classes
    return this.usersService.createUser({
      id: user.id,
      name: user.name,
      age: user.age,
      isMarried: user.isMarried,
    });
  }

  // inthe @Patch() and @Put() methods, you can also use the same CreateUserDto
  // but you need to make all the properties optional in the dto
  // so that you can update only the properties that you want to update
  // we shall use mapped types and partial types to achieve this in the next section
  @Patch(':id')
  updateUserObject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    console.log(body);
    return this.usersService.updateUser({ ...body, id });
  }
}

// for validation pipe and the default value pipe to work you need to use new ValidationPipe() and new DefaultValuePipe()
