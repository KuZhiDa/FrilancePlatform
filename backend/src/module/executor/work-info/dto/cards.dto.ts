import { IsNotEmpty, Length, Matches } from 'class-validator';

export class DtoCards {
  id?: number;

  @IsNotEmpty({ message: 'Поле skillName не должно быть пустым.' })
  @Length(1, 30, {
    message: 'Поле skillName должно содержать от 1 до 30 символов.',
  })
  skillName: string;

  @IsNotEmpty({ message: 'Поле experience не должно быть пустым.' })
  experience: number;

  infoAboutSkillOrExperience?: string;
  project?: boolean;
}
