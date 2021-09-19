import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CourseDocument } from 'src/courses/schemas/courses.schema';
import { preReq } from 'src/courses/schemas/prereq.schema';
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

  async makeSchedule(
    courses: string[],
    userID: string,
    alreadyTaken: string[],
  ) {
    const requiredCoursesList = await this.generateService.generateList(
      courses,
    );

    let requiredCourses = await this.coursesService.findListOfCourses(
      requiredCoursesList,
    );

    requiredCourses.sort((a, b) => a.gradeReq - b.gradeReq);

    //requiredCourses = requiredCourses.filter((e) => e.name !== 'Algebra 1');

    requiredCourses = requiredCourses.filter(
      ({ name }) => !alreadyTaken.includes(name),
    );

    const takenCoursesDocumentsPromises = alreadyTaken.map((i) =>
      this.coursesService.findName(i),
    );

    const takenCoursesDocuments = await Promise.all(
      takenCoursesDocumentsPromises,
    );

    const mockSchedule: CourseDocument[][] = [
      [],
      [],
      [],
      [],
      takenCoursesDocuments,
    ];

    let currentYear = 0;
    let lastLen = requiredCourses.length;

    while (requiredCourses.length !== 0) {
      for (const i of requiredCourses) {
        if (
          i.gradeReq - 9 <= currentYear &&
          this.checkPre(i.preReqsCategoryA, mockSchedule, currentYear) &&
          this.checkPre(i.preReqsCategoryB, mockSchedule, currentYear)
        ) {
          mockSchedule[currentYear].push(i);
          requiredCourses = requiredCourses.filter((e) => e !== i);

          if (mockSchedule[currentYear].length === 8) {
            if (currentYear === 3) break;
            else currentYear++;
          }
        }
      }

      if (lastLen === requiredCourses.length) {
        if (currentYear === 3) break;
        else currentYear++;
      }

      lastLen = requiredCourses.length;
    }

    return await this.schedulerService.create({
      user: await this.usersService.findOne(userID),
      input: courses,
      gradeNine: mockSchedule[0],
      gradeTen: mockSchedule[1],
      gradeEleven: mockSchedule[2],
      gradeTwelve: mockSchedule[3],
    });
  }

  private checkPre(
    preReqs: preReq[],
    full: CourseDocument[][],
    year: number,
  ): boolean {
    return (
      preReqs.length === 0 ||
      full[year].length === 0 ||
      (preReqs
        .map(
          (e) =>
            e.concurrent ||
            !full[year].map(({ name }) => name).includes(e.name),
        )
        .every((itm) => itm === true) &&
        preReqs
          .map((pre) =>
            full
              .map((i) => i.map((h) => h.name).includes(pre.name))
              .includes(true),
          )
          .includes(true))
    );
  }
}
