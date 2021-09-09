import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { GenerateListService } from './generateList.service';
import { SchedulerService } from './scheduler.service';

@Injectable()
export class GenerateScheduleService {
  constructor(
    private readonly generateService: GenerateListService,
    private readonly coursesService: CoursesService,
    private readonly schedulerService: SchedulerService,
  ) {}

  async makeSchedule(courses: string[], userID: string) {
    const requiredCoursesList = await this.generateService.generateList(
      courses,
    );
    const requiredCourses = await this.coursesService.findListOfCourses(
      requiredCoursesList,
    );

    requiredCourses.sort((a, b) => a.gradeReq - b.gradeReq);

    const mockSchedule: string[][] = [[], [], [], []];

    let currentYear = 0;

    requiredCourses.forEach((e) => {
      console.log(e.gradeReq - 9, currentYear, e.name, e.gradeReq);
      if (e.gradeReq - 9 <= currentYear) {
        mockSchedule[currentYear].push(e.name);

        if (mockSchedule[currentYear].length === 8) {
          currentYear++;
        }
      }
    });

    return await this.schedulerService.create({
      user: userID,
      gradeNine: mockSchedule[0],
      gradeTen: mockSchedule[1],
      gradeEleven: mockSchedule[2],
      gradeTwelve: mockSchedule[3],
    });
  }
}
