import { DocumentBuilder } from '@nestjs/swagger';
import { DocumentationTagsEnum } from './core/util/documentation-tags.enum';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Zip Code Challenge')
  .setDescription('API return address from a zipcode')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag(DocumentationTagsEnum.AUTH)
  .addTag(DocumentationTagsEnum.ADDRESS)
  .addTag(DocumentationTagsEnum.HEALTH)
  .build();
