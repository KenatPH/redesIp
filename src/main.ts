import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { ModuleSeeder } from './seeds/module.seed';
const SWAGGER_ENVS = ['local', 'dev', 'staging', 'qa'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // cors

  //swagger only developer or qa
  //if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
  /* app.use(
    ['/api/doc', '/docs-json', '/'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );*/

  const config = new DocumentBuilder()
    .setTitle('felizviaje-api')
    .setDescription('The felizviaje-api API description.')
    .setVersion('1.0.0')
    .addTag('felizviaje-api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document); // swagger at /api/doc
  //}

  app.use(passport.initialize());

  // Ejecutar el seeder // para crear una nueva crear en la carpera src/seed/NOMBRE DEL SEED
  const moduleSeeder = app.get(ModuleSeeder);
  await moduleSeeder.run();

  await app.listen(process.env.PORT);
}
bootstrap();
