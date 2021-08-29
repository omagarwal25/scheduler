import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forRoot('mongodb://mongo:27017/nest', {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 30,
    }),
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
