import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api/');
  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
