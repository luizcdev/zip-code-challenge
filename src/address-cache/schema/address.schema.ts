import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressDto } from 'src/common/dto/address.dto';

@Schema({ timestamps: true })
export class Address extends Document implements AddressDto {
  @Prop({ required: true, unique: true })
  searchKey: string;

  @Prop()
  zipCode: string;

  @Prop()
  street: string;

  @Prop()
  neighborhood: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop({ expires: 10000 })
  createdAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
