import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('Vash API')
    .setDescription('Vash API description')
    .addTag('vash')
    .addServer(`http://localhost:3000/api`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  app.setGlobalPrefix('api/');
  const prismaService = app.get(PrismaService);
  await app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
