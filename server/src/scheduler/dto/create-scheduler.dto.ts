import { IsNotEmpty } from 'class-validator';

export class CreateSchedulerDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  gradeNine: string[];

  @IsNotEmpty()
  gradeTen: string[];

  @IsNotEmpty()
  gradeEleven: string[];

  @IsNotEmpty()
  gradeTwelve: string[];
}
