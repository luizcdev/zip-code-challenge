import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schema/address.schema';
import { AddressDto } from './dto/address.dto';
import { ViaCepClientService } from '../clients/viacep/viacep-client.service';
import { ViaCepResponseDto } from '../clients/viacep/dto/viacep-response.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    private readonly clientService: ViaCepClientService,
  ) {}

  async create(addressDto: AddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(addressDto);
    return createdAddress.save();
  }

  async findByZipCode(zipCode: string): Promise<AddressDto> {
    const response: ViaCepResponseDto =
      await this.clientService.getAddressByZipCode(zipCode);

    return <AddressDto>{
      zipCode: response.cep,
      street: response.logradouro,
      district: response.bairro,
      city: response.localidade,
      state: response.uf,
    };
  }
}
