import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Address extends Document {
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

  @Prop({ expires: process.env.CACHE_TTL })
  createdAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
