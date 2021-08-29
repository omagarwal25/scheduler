import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { Scheduler, SchedulerDocument } from './schemas/scheduler.schema';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectModel(Scheduler.name)
    private schedulerModel: Model<SchedulerDocument>,
  ) {}

  async create(createSchedulerDto: CreateSchedulerDto) {
    try {
      const createdSchedule = new this.schedulerModel(createSchedulerDto);
      return await createdSchedule.save();
    } catch (error) {
      throw new BadRequestException('Invalid value for semester.');
    }
  }

  async findAll() {
    return await this.schedulerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.findUser(id);
  }

  async update(id: string, updateSchedulerDto: UpdateSchedulerDto) {
    const modSchedule = await this.findUser(id);
    try {
      if (updateSchedulerDto.name) modSchedule.name = updateSchedulerDto.name;
      if (updateSchedulerDto.user) modSchedule.user = updateSchedulerDto.user;
      if (updateSchedulerDto.gradeNine)
        modSchedule.gradeNine = updateSchedulerDto.gradeNine;
      if (updateSchedulerDto.gradeTen)
        modSchedule.gradeTen = updateSchedulerDto.gradeTen;
      if (updateSchedulerDto.gradeEleven)
        modSchedule.gradeEleven = updateSchedulerDto.gradeEleven;
      if (updateSchedulerDto.gradeTwelve)
        modSchedule.gradeTwelve = updateSchedulerDto.gradeTwelve;

      return await modSchedule.save();
    } catch (error) {
      throw new BadRequestException('Invalid value for semester. ');
    }
  }

  async remove(id: string) {
    const result = await this.schedulerModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user');
    }
    return { message: `${id} deleted sucessfully` };
  }

  private async findUser(id: string): Promise<SchedulerDocument> {
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
