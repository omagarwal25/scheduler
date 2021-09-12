import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SchedulerService } from './services/scheduler.service';
import { GenerateScheduleService } from './services/createSchedule.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly createScheduleService: GenerateScheduleService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() courses: string[], @Request() req: any) {
    return this.createScheduleService.makeSchedule(courses, req.user.userId);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  findByUser(@Request() req: any) {
    console.log(req);
    return this.schedulerService.findAllByUser(req.user.userId);
  }

  @Get()
  findAll() {
    return this.schedulerService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.schedulerService.remove(id);
  }
}
