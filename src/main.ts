import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any properties that are not in the dto
      forbidNonWhitelisted: true, // this will throw an error if any properties are not in the dto
      transform: true, // this will automatically transform the payloads to be objects typed according to their DTO classes
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
// Here, we are using the ValidationPipe globally to validate all incoming requests
// you can also use the ValidationPipe locally in the controller or in the method
// but using it globally is a better approach as it ensures that all incoming requests are validated
// and also it reduces the boilerplate code in the controller and method
// you can also customize the ValidationPipe by passing options to it
// for more information, check the official documentation of NestJS
// https://docs.nestjs.com/techniques/validation
