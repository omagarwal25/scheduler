import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { SchedulerService } from './scheduler.service';
import { Course } from 'src/courses/schemas/courses.schema';
import { GraphService } from './graph.service';
// import { preReq } from 'src/courses/schemas/prereq.schema';

@Injectable()
export class GenerateListService {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly coursesService: CoursesService,
  ) {}

  async generateList(courses: string[]) {
    const paths = await this.getAllPathsWithInformation(courses);

    const allPaths = paths.map((array) => this.findMostEfficientRoutes(array));

    let output: string[] = [
      'English 9',
      'English 10',
      'Science 9',
      'Science 10',
    ];

    allPaths.forEach((e) => {
      e.forEach((y) => {
        if (!output.includes(y)) {
          output.push(y);
        }
      });
    });

    return output;
  }

  private findMostEfficientRoutes(paths: any[]) {
    const courses: string[] = [];
    for (let x = 0; x < paths.length; x++) {
      if (paths[x].courseTier !== '') {
        for (let i = 0; i < paths.length; i++) {
          if (
            paths[x].courseTier === paths[i].courseTier &&
            i !== x &&
            paths[x].distance > paths[i].distance &&
            !courses.includes(paths[i].course)
          ) {
            courses.push(paths[i].course);
          }
        }

        for (let i = 0; i < paths.length; i++) {
          if (paths[x].courseTier === paths[i].courseTier && i !== x) {
            break;
          }
          if (i === paths.length - 1 && !courses.includes(paths[i].course)) {
            courses.push(paths[x].course);
          }
        }
      } else {
        courses.push(paths[x].course);
      }
    }
    return courses;
  }

  private async getAllPathsWithInformation(courses: string[]) {
    const g = await this.generateGraph(await this.coursesService.findAll());
    const paths = courses.map((course) => g.shortestPath(course));

    const awaitCourseDocuments = [];

    paths.forEach((path) =>
      path.forEach((e) =>
        awaitCourseDocuments.push(this.coursesService.findName(e.course)),
      ),
    );

    const courseDocuments = await Promise.all(awaitCourseDocuments);

    const pathsWithInfo = paths.map((e) =>
      e.map((path) => {
        return {
          course: path.course,
          distance: path.distance,
          ...courseDocuments.find(({ name }) => name === path.course)._doc,
        };
      }),
    );

    return pathsWithInfo;
  }

  private async generateGraph(courses: Course[]) {
    const g = new GraphService(courses.length);
    courses.forEach((course) => {
      g.addVertex(course.name);
    });

    for (const course of courses) {
      if (course.preReqsCatogoryA.length > 0) {
        const promisedPreReqInfo = course.preReqsCatogoryA.map((e) =>
          this.coursesService.findName(e.name),
        );

        const preReqInfo = await Promise.all(promisedPreReqInfo);

        preReqInfo.sort((a, b) => a.prestige - b.prestige);

        preReqInfo.forEach((element) => {
          g.addEdge(course.name, element.name, 1 / element.prestige);
        });
      }
      if (course.preReqsCatogoryB.length > 0) {
        const promisedPreReqInfo = course.preReqsCatogoryB.map((e) =>
          this.coursesService.findName(e.name),
        );

        const preReqInfo = await Promise.all(promisedPreReqInfo);

        preReqInfo.sort((a, b) => a.prestige - b.prestige);

        preReqInfo.forEach((element) =>
          g.addEdge(course.name, element.name, 1 / element.prestige),
        );
      }
    }

    return g;
  }
}
