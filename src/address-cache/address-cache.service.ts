import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schema/address.schema';
import { AddressDto } from 'src/common/dto/address.dto';

@Injectable()
export class AddressCacheService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async create(address: AddressDto): Promise<void> {
    const createdAddress = new this.addressModel(address);
    createdAddress.save();
  }

  async findBySeachKey(searchKey: string): Promise<AddressDto> {
    return this.addressModel.findOne({ searchKey: searchKey }).exec();
  }
}
