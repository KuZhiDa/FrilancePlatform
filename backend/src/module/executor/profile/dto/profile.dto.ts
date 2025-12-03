import { IsNumber, IsOptional, Length, Matches } from 'class-validator';
import { Education } from 'src/common/constant/education.type';
import type { Male } from 'src/common/constant/male.type';

export class DtoProfile {
  @IsOptional()
  @IsNumber({}, { message: 'Возраст должен быть числом.' })
  age?: number;

  male?: Male;

  education?: Education;

  @IsOptional()
  @Length(1, 20, { message: 'Название страны не верного формата.' })
  @Matches(/^[А-ЯЁ][а-яё]+$/, {
    message: 'Название страны не верного формата.',
  })
  countryFrom?: string;

  @IsOptional()
  @Length(1, 20, { message: 'Название города не верного формата.' })
  @Matches(/^[А-ЯЁ][а-яё]+$/, {
    message: 'Название города не верного формата.',
  })
  cityFrom?: string;

  @IsOptional()
  @Length(0, 250, { message: 'Максимальная длинна поля 250 символов' })
  @Matches(/^[А-Яа-я0-9.,! ]+$/, {
    message: 'Допустимы только русские буквы, а также набор из символов (.,!).',
  })
  infoAboutYourself?: string;
}
