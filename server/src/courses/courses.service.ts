import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument, Course } from './schemas/courses.schema';
import { Model } from 'mongoose';

// db.multiArr.find({'Keys':{$elemMatch:{$elemMatch:{$in:['carrot']}}}})

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const createdCourse = new this.courseModel(createCourseDto);
      return await createdCourse.save();
    } catch (error) {
      throw new BadRequestException('Invalid value.');
    }
  }

  async findAll() {
    return await this.courseModel.find().exec();
  }

  async findOne(id: string) {
    return await this.findUser(id);
  }

  async findName(name: string) {
    const e = await this.courseModel.findOne({ name: name }).exec();
    return e;
  }

  async findListOfCourses(courses: string[]) {
    const promiseListCourses = courses.map((name) => {
      return this.findName(name);
    });

    const listCourses: CourseDocument[] = await Promise.all(promiseListCourses);

    return listCourses;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const modCourse = await this.findUser(id);
    try {
      if (updateCourseDto.name) modCourse.name = updateCourseDto.name;
      if (updateCourseDto.preReqsCatogoryA)
        modCourse.preReqsCatogoryA = updateCourseDto.preReqsCatogoryA;
      if (updateCourseDto.preReqsCatogoryB)
        modCourse.preReqsCatogoryB = updateCourseDto.preReqsCatogoryB;
      if (updateCourseDto.credits) modCourse.credits = updateCourseDto.credits;
      if (updateCourseDto.gradeReq)
        modCourse.gradeReq = updateCourseDto.gradeReq;
      if (updateCourseDto.prestige)
        modCourse.prestige = updateCourseDto.prestige;
      if (updateCourseDto.semester)
        modCourse.semester = updateCourseDto.semester;
      return await modCourse.save();
    } catch (error) {
      throw new BadRequestException('Invalid value for semester. ');
    }
  }

  async remove(id: string) {
    const result = await this.courseModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user');
    }
    return { message: `${id} deleted sucessfully` };
  }

  private async findUser(id: string): Promise<CourseDocument> {
    let course: any;
    try {
      course = await this.courseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!course) {
      throw new NotFoundException('Could not find course.');
    }
    return course;
  }
}
