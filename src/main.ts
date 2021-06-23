import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DocumentationTagsEnum } from './core/util/documentation-tags.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Zip Code Challenge')
    .setDescription('API return address from a zipcode')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag(DocumentationTagsEnum.AUTH)
    .addTag(DocumentationTagsEnum.ADDRESS)
    .addTag(DocumentationTagsEnum.HEALTH)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
