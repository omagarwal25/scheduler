import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { GenerateListService } from './generateList.service';

@Injectable()
export class GenerateScheduleService {
  constructor(
    private readonly generateService: GenerateListService,
    private readonly coursesService: CoursesService,
  ) {}

  async makeSchedule(courses: string[]) {
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

    return mockSchedule;
  }
}
