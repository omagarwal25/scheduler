import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchedulerDto } from '../dto/create-scheduler.dto';
import { Scheduler, SchedulerDocument } from '../schemas/scheduler.schema';
import { UpdateSchedulerDto } from '../dto/update-scheduler.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectModel(Scheduler.name)
    private schedulerModel: Model<SchedulerDocument>,
    private usersService: UsersService,
  ) {}

  async create(createSchedulerDto: CreateSchedulerDto) {
    const createdSchedule = new this.schedulerModel(createSchedulerDto);
    return await createdSchedule.save();
  }

  async findAll() {
    return await this.schedulerModel.find().exec();
  }

  async findAllByUser(user: string) {
    const findUser = await this.usersService.findOne(user);
    return await this.schedulerModel.find({ user: findUser }).exec();
  }

  async findOne(id: string) {
    return await this.schedulerModel
      .findById(id)
      .populate('gradeNine')
      .populate('gradeTen')
      .populate('gradeEleven')
      .populate('gradeTwelve');
  }

  async update(id: string, updateSchedulerDto: UpdateSchedulerDto) {
    const modSchedule = await this.findSchedule(id);
    if (updateSchedulerDto.user) modSchedule.user = updateSchedulerDto.user;
    if (updateSchedulerDto.gradeNine)
      modSchedule.gradeNine = updateSchedulerDto.gradeNine;
    if (updateSchedulerDto.input) modSchedule.input = updateSchedulerDto.input;
    if (updateSchedulerDto.gradeTen)
      modSchedule.gradeTen = updateSchedulerDto.gradeTen;
    if (updateSchedulerDto.gradeEleven)
      modSchedule.gradeEleven = updateSchedulerDto.gradeEleven;
    if (updateSchedulerDto.gradeTwelve)
      modSchedule.gradeTwelve = updateSchedulerDto.gradeTwelve;

    return await modSchedule.save();
  }

  async remove(id: string) {
    const result = await this.schedulerModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find schedule');
    }
    return { message: `${id} deleted successfully` };
  }

  private async findSchedule(id: string): Promise<SchedulerDocument> {
    let schedule: any;
    try {
      schedule = await this.schedulerModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!schedule) {
      throw new NotFoundException('Could not find course.');
    }
    return schedule;
  }
}
