import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  readonly name: string;

  readonly preReqsCategoryA: { name: string; concurrent: boolean }[];

  readonly preReqsCategoryB: { name: string; concurrent: boolean }[];

  @IsNotEmpty()
  readonly credits: string[];

  @IsNotEmpty()
  readonly gradeReq: number;

  @IsNotEmpty()
  readonly prestige: number;

  @IsNotEmpty()
  readonly semester: string;

  readonly courseTier: string;
}
