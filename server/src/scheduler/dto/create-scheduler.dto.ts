import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateSchedulerDto {
  @IsNotEmpty()
  user: CreateUserDto;

  @IsNotEmpty()
  gradeNine: string[];

  @IsNotEmpty()
  gradeTen: string[];

  @IsNotEmpty()
  gradeEleven: string[];

  @IsNotEmpty()
  gradeTwelve: string[];

  @IsNotEmpty()
  input: string[];
}
