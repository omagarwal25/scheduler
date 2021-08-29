import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  preReqsCatogoryA: { name: string; concurrent: boolean }[];

  preReqsCatogoryB: { name: string; concurrent: boolean }[];

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
