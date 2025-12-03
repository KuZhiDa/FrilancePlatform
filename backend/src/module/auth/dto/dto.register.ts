import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

//Класс DTO для регистрации
export class DtoForReg {
  //Проверка на полноту заполнения, на длину и шаблон строки
  @Length(4, 15, {
    message: 'Поле username должно содержать от 4 до 15 символов.',
  })
  @Matches(/^[0-9a-zA-Z]+$/, {
    message:
      'Поле username должно состоять из цифр и букв латинского алфавита.',
  })
  @IsNotEmpty({ message: 'Поле username не должно быть пустым' })
  username: string;

  //Проверка на полноту заполнения, и на соответствие строки имайлу
  @IsNotEmpty({ message: 'Поле email не должно быть пустым' })
  @IsEmail({}, { message: 'Поле email должно удовлетворять структуре почт.' })
  email: string;

  //Если строка не пустая проверка на длину и шаблон строки
  @IsOptional()
  @Length(11, 11, {
    message: 'Поле phone_number должно содержать ровно из 11 цифр',
  })
  @Matches(/^8[0-9]+$/, {
    message: 'Поле phone_number должно состоять только из цифр.',
  })
  phoneNumber?: string;

  //Проверка на полноту заполнения, длину и шаблон строки
  @IsNotEmpty({ message: 'Поле password не должно быть пустым' })
  @Length(8, 16, {
    message: 'Поле password должно содержать от 8 до 16 символов.',
  })
  @Matches(/^[A-Za-z0-9]+$/, {
    message:
      'Поле password должно состоять из цифр и букв латинского алфавита.',
  })
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/, {
    message:
      'Поле password должно содержать хотя-бы одну заглавную, одну строчную букву и цифру',
  })
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  is2Fa: boolean;
}
