import { Module } from '@nestjs/common';
import { SchedulerService } from './services/scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Scheduler, SchedulerSchema } from './schemas/scheduler.schema';
import { GenerateListService } from './services/generateList.service';
import { GenerateScheduleService } from './services/createSchedule.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SchedulerService, GenerateListService, GenerateScheduleService],
  controllers: [SchedulerController],
  imports: [
    CoursesModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Scheduler.name, schema: SchedulerSchema },
    ]),
  ],
})
export class SchedulerModule {}
