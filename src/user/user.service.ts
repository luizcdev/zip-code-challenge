import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UserRequestDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.findOne({ username, password }).exec();
  }

  async create(user: UserRequestDto): Promise<User> {
    let userDocument: User = await this.userModel
      .findOne({ username: user.username })
      .exec();

    if (userDocument) throw new BadRequestException('Username already exists');

    userDocument = new this.userModel(user);
    return userDocument.save();
  }
}
