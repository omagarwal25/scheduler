import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    try {
      return await createdUser.save();
    } catch (error) {
      throw new BadRequestException(
        'Duplicate User, email address already exists in system.',
      );
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.findUser(id);
  }

  async findOneByName(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const modUser = await this.findUser(id);
    if (updateUserDto.username) modUser.username = updateUserDto.username;
    if (updateUserDto.thirdPartyId)
      modUser.thirdPartyId = updateUserDto.thirdPartyId;
    if (updateUserDto.email) modUser.email = updateUserDto.email;
    if (updateUserDto.username) modUser.username = updateUserDto.username;
    return await modUser.save();
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user');
    }

    return { message: `${id} deleted successfully` };
  }

  private async findUser(id: string) {
    let user: null | UsersDocument;

    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }

    return user;
  }
}
