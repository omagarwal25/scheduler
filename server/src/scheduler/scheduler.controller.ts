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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly createScheduleService: GenerateScheduleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() courses: string[], @Request() req: any) {
    return this.createScheduleService.makeSchedule(courses, req.user.userId, [
      'Algebra 1',
    ]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  findByUser(@Request() req: any) {
    return this.schedulerService.findAllByUser(req.user.userId);
  }

  @Get()
  findAll() {
    return this.schedulerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    // hey this guard is slightly dysfunctional maybe fix?
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
