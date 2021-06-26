import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorFilter } from './core/filter/error.filter';
import { CustomLoggerService } from './core/logger/logger.service';
import { swaggerConfig } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const logger: CustomLoggerService = await app.resolve<CustomLoggerService>(
    CustomLoggerService,
  );
  app.useGlobalFilters(new ErrorFilter(logger));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
