import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { GenerateListService } from './generateList.service';
import { SchedulerService } from './scheduler.service';

@Injectable()
export class GenerateScheduleService {
  constructor(
    private readonly generateService: GenerateListService,
    private readonly coursesService: CoursesService,
    private readonly schedulerService: SchedulerService,
    private readonly usersService: UsersService,
  ) {}

  async makeSchedule(courses: string[], userID: string) {
    const user = await this.usersService.findOne(userID);

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
      if (e.gradeReq - 9 <= currentYear) {
        mockSchedule[currentYear].push(e.name);

        if (mockSchedule[currentYear].length === 8) {
          currentYear++;
        }
      }
    });

    return await this.schedulerService.create({
      user: user,
      input: courses,
      gradeNine: mockSchedule[0],
      gradeTen: mockSchedule[1],
      gradeEleven: mockSchedule[2],
      gradeTwelve: mockSchedule[3],
    });
  }
}
