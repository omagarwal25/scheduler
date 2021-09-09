import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
// import { CreateSchedulerDto } from './dto/create-scheduler.dto';
// import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { GenerateListService } from './generateList.service';
import { GenerateScheduleService } from './createSchedule.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly createScheduleService: GenerateScheduleService,
  ) {}

  @Post(':userID')
  async create(@Body() courses: string[], @Param('userID') userID: string) {
    return this.createScheduleService.makeSchedule(courses, userID);
    // return this.schedulerService.create(createSchedulerDto);
  }

  @Get()
  findAll() {
    return this.schedulerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulerService.findOne(id);
  }

  /*
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchedulerDto: UpdateSchedulerDto,
  ) {
    return this.schedulerService.update(+id, updateSchedulerDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulerService.remove(id);
  }
}
