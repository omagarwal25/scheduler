import { IsNotEmpty } from 'class-validator';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateSchedulerDto {
  @IsNotEmpty()
  user: CreateUserDto;

  @IsNotEmpty()
  gradeNine: CreateCourseDto[];

  @IsNotEmpty()
  gradeTen: CreateCourseDto[];

  @IsNotEmpty()
  gradeEleven: CreateCourseDto[];

  @IsNotEmpty()
  gradeTwelve: CreateCourseDto[];

  @IsNotEmpty()
  input: string[];
}
