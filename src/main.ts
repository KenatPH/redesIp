import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ecommerce API')
    .setDescription('API para gestión de ecommerce')
    .addBearerAuth() 
    .setVersion('1.0')
    .build();

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permitir solicitudes desde cualquier origen
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen( process.env.PORT);
}
bootstrap();
