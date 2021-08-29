import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Scheduler, SchedulerSchema } from './schemas/scheduler.schema';
import { GenerateService } from './generate.service';

@Module({
  providers: [SchedulerService, GenerateService],
  controllers: [SchedulerController],
  imports: [
    CoursesModule,
    MongooseModule.forFeature([
      { name: Scheduler.name, schema: SchedulerSchema },
    ]),
  ],
})
export class SchedulerModule {}
