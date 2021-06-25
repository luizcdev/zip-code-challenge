import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UserRequestDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

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

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(userRequest: UserRequestDto): Promise<User> {
    const user: User = await this.userModel
      .findOne({ username: userRequest.username })
      .exec();

    if (user) throw new BadRequestException('Username already exists');

    const hash = await bcrypt.hash(userRequest.password, 10);
    return this.userModel.create(<User>{
      username: userRequest.username,
      password: hash,
    });
  }
}
