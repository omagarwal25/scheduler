import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const modUser = await this.findUser(id);
    if (updateUserDto.username) modUser.username = modUser.username;
    if (updateUserDto.password) modUser.password = modUser.password;

    return await modUser.save();
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user');
    }

    return { message: `${id} deleted sucessfully` };
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
