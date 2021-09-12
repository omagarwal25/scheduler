import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateSchedulerDto {
  @IsNotEmpty()
  readonly user: CreateUserDto;

  @IsNotEmpty()
  readonly gradeNine: string[];

  @IsNotEmpty()
  readonly gradeTen: string[];

  @IsNotEmpty()
  readonly gradeEleven: string[];

  @IsNotEmpty()
  readonly gradeTwelve: string[];

  @IsNotEmpty()
  readonly input: string[];
}
