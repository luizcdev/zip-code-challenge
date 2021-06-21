import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop()
  zipCode: string;

  @Prop()
  street: string;

  @Prop()
  district: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
