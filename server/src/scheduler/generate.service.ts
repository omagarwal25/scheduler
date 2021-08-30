import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { SchedulerService } from './scheduler.service';
import { Course } from 'src/courses/schemas/courses.schema';
// import { preReq } from 'src/courses/schemas/prereq.schema';

@Injectable()
export class GenerateService {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly coursesService: CoursesService,
  ) {}

  async generate(courses: string[]) {
    const paths = await this.getAllPathsWithInformation(courses);

    const allPaths = [];

    for (const array of paths) {
      // THIS FUNCTION IS BAD, FIX SO THAT IT CAN BE TURNED INTO A SERVICE AND IS BETTER!

      allPaths.push(this.findMostEfficientRoutes(array));
    }

    const output = [];

    allPaths.forEach((e) => {
      e.forEach((y: string) => output.push(y));
    });

    return output.filter((item, index, arr) => arr.indexOf(item) === index);
  }

  private findMostEfficientRoutes(paths: any[]) {
    const courses = [];
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

  private async findListOfCourses(courses: string[]) {
    const promiseListCourses = courses.map((name) => {
      return this.coursesService.findName(name);
    });

    const listCourses = await Promise.all(promiseListCourses);

    return listCourses;
  }

  private async generateGraph(courses: Course[]) {
    const g = new Graph(courses.length);
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

class Graph {
  AdjList: any;
  noOfVerticies: number;

  constructor(noOfVerticies: number) {
    this.noOfVerticies = noOfVerticies;
    this.AdjList = new Map();
  }

  addVertex(v: string) {
    this.AdjList.set(v, []);
  }

  addEdge(v: string, u: string, w: number) {
    // add logic to deal with case where edge already exists, and to take lower weighting
    this.AdjList.get(v).push({ node: u, weight: w });
  }

  topologicalSortUtil(
    v: string,
    visted: Record<string, unknown>,
    stack: string[],
  ) {
    visted[v] = true;

    const get_keys = this.AdjList.keys();

    let vInGetKeys = false;

    for (const i of get_keys) {
      if (v === i) {
        vInGetKeys = true;
        break;
      }
    }

    if (vInGetKeys === true) {
      for (const i of this.AdjList.get(v)) {
        if (visted[i.node] === false) {
          this.topologicalSortUtil(i.node, visted, stack);
        }
      }
    }

    stack.push(v);
  }

  shortestPath(s: string) {
    const visited = {};
    const stack: string[] = [];
    const dist = {};

    for (const i of this.AdjList.keys()) {
      visited[i] = false;
    }

    for (const i of this.AdjList.keys()) {
      if (visited[i] === false) {
        this.topologicalSortUtil(s, visited, stack);
      }
    }

    for (const i of this.AdjList.keys()) {
      dist[i] = Infinity;
    }

    dist[s] = 0;

    while (stack.length > 0) {
      const i = stack.pop();

      this.AdjList.get(i).forEach(
        ({ node, weight }) =>
          (dist[node] = Math.min(dist[i] + weight, dist[node])),
      );
    }

    const result: Path[] = [];

    for (const i of this.AdjList.keys()) {
      if (dist[i] !== Infinity) {
        result.push({ course: i, distance: dist[i] });
      }
    }

    return result;
  }

  printGraph() {
    // get all the vertices
    const get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (const i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      const get_values = this.AdjList.get(i);
      let conc = '';

      // iterate over the adjacency list
      // concatenate the values into a string
      for (const j of get_values) conc += j + ' ';

      // print the vertex and its adjacency list
      console.log(i + ' -> ' + conc);
    }
  }
}
