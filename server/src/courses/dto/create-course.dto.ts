import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  preReqsCategoryA: { name: string; concurrent: boolean }[];

  preReqsCategoryB: { name: string; concurrent: boolean }[];

  @IsNotEmpty()
  credits: string[];

  @IsNotEmpty()
  gradeReq: number;

  @IsNotEmpty()
  prestige: number;

  @IsNotEmpty()
  semester: string;

  courseTier: string;
}
