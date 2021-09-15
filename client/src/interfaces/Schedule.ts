import { CourseInterface } from './Courses';

export interface Schedule {
  user: string;

  gradeNine: CourseInterface[];

  gradeTen: CourseInterface[];

  gradeEleven: CourseInterface[];

  gradeTwelve: CourseInterface[];

  createdAt: Date;

  _id: string;
}
