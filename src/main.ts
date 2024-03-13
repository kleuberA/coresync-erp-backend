import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })

  const config = new DocumentBuilder()
    .setTitle('CoreSync ERP API')
    .setDescription('The CoreSync ERP API, for all your ERP needs.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const optionsV1 = theme.getDefaultConfig('dark' as SwaggerThemeName); // Fix: Cast the argument to SwaggerThemeName
  SwaggerModule.setup('api', app, document, optionsV1);

  await app.listen(3000);
}
bootstrap();
